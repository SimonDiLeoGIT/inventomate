# 1 - Install and configure istio 
cd $HOME/istio/bin
./istioctl install --set profile=demo -y

kubectl apply -f /Users/david/Documents/code/newfolder/unlu2024/SD2024/tif/cloud-shared-services/argocd/argocd-apps/services/configurations/istio/allowed-traffic.yaml

kubectl create ns services-redis || echo " ns already exists " 
kubectl create ns cert-manager || echo " ns already exists " 
kubectl create ns services-rabbitmq || echo " ns already exists " 
kubectl label namespace services-rabbitmq istio-injection=enabled
kubectl label namespace cert-manager istio-injection=enabled
kubectl label namespace services-redis istio-injection=enabled

# GET SVC and update
CF_API_TOKEN="FAL"
CF_ZONE_ID="OPA"

EXTERNAL_IP=$(kubectl get svc istio-ingressgateway -n istio-system -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
          echo "EXTERNAL IP: $EXTERNAL_IP"


          if [ -z "$EXTERNAL_IP" ]; then
              echo "Failed to fetch external IP"
              exit 1
          fi

          echo "getting RECORDS from Cloudflare"
          # Fetch all A records from Cloudflare
          RECORDS_JSON=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records?type=A" \
            -H "Authorization: Bearer $CF_API_TOKEN" \
            -H "Content-Type: application/json")

          # Parse JSON to get individual records and update them with the new IP
          echo "$RECORDS_JSON" | jq -c '.result[] | {id, name, content}' | while read -r record; do
              RECORD_ID=$(echo $record | jq -r '.id')
              RECORD_NAME=$(echo $record | jq -r '.name')

              echo "Updating DNS record $RECORD_NAME with IP $EXTERNAL_IP"

              # Update the DNS record
              RESPONSE=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records/$RECORD_ID" \
                -H "Authorization: Bearer $CF_API_TOKEN" \
                -H "Content-Type: application/json" \
                --data '{
                  "type": "A",
                  "name": "'"$RECORD_NAME"'",
                  "content": "'"$EXTERNAL_IP"'",
                  "ttl": 1,
                  "proxied": false
                }')

              echo "Update response: $RESPONSE"
              SUCCESS=$(echo $RESPONSE | jq -r '.success')
              if [ "$SUCCESS" != "true" ]; then
                  echo "Failed to update DNS record $RECORD_NAME: $(echo $RESPONSE | jq -r '.errors[] .message')"
              fi
          done

# 2 - Install and configure CERT MANAGER
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version 1.14.5 \
  --set installCRDs=true \
  --set replicaCount=3 \
  --set-string 'extraArgs[0]=--dns01-recursive-nameservers=1.1.1.1:53\,9.9.9.9:53' \
  --set 'extraArgs[1]=--dns01-recursive-nameservers-only' \
  --set podDnsPolicy=None \
  --set 'podDnsConfig.nameservers[0]=1.1.1.1' \
  --set 'podDnsConfig.nameservers[1]=9.9.9.9'

# Configure cert manager
kubectl create secret generic cloudflare-token-secret \                                         
            --from-literal=cloudflare-token=_pZ1lYoV4XSfbsFe999WWDoxIOJumIkbAPG896FZ \
            --namespace cert-manager || echo " secret already exists"


#kubectl apply -f /Users/david/Documents/code/newfolder/unlu2024/SD2024/tif/cloud-shared-services/argocd/argocd-apps/services/configurations/cert-manager/letsencrypt-staging.yaml

# UPDATE DNS ON CLOUDFLARE


# #!/bin/bash

# # Step 1: Create the $HOME/istio directory
# mkdir -p $HOME/istio

# # Step 2: Change to the $HOME/istio directory
# cd $HOME/istio

# # Step 3: Download and install Istio
# curl -L https://istio.io/downloadIstio | sh -

# # Step 4: Move to the Istio installation directory (assuming there's only one matching "istio-*")
# cd istio-*

# # Step 5: Move all files to $HOME/istio
# mv * $HOME/istio/

# # Step 6: Change back to $HOME/istio
# cd $HOME/istio

# # Step 7: Add Istio's bin directory to PATH
# export PATH=$HOME/istio/bin:$PATH

# # Step 8: Make the PATH change permanent by adding it to the appropriate profile script
# echo 'export PATH=$HOME/istio/bin:$PATH' >> ~/.bashrc

# # Step 9: Source the profile script to update the current terminal session (for bash)
# source ~/.bashrc

#  ~/istio  istioctl install --set profile=demo -y
# # Note: For zsh users, use ~/.zshrc instead of ~/.bashrc in steps 8 and 9.

# 3 configure rabbitmq cluster 

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install rabbitmq-operator bitnami/rabbitmq-cluster-operator --namespace services-rabbitmq --create-namespace --version 4.2.10

kubectl apply -f /Users/david/Documents/code/newfolder/unlu2024/SD2024/tif/cloud-shared-services/argocd/argocd-apps/apps/deployments/rabbitmq/all1file.yaml

# 4 configure redis clsuter 

#!/bin/bash

# Define namespace and Helm release parameters
NAMESPACE="services-redis"
RELEASE_NAME="redis-cluster"
REDIS_CHART_VERSION="10.0.6"

# Ensure the namespace exists
kubectl get namespace $NAMESPACE || kubectl create namespace $NAMESPACE

# Generate a strong password for Redis
REDIS_PASSWORD=$(openssl rand -base64 12)
REDIS_USER="admin"

# Helm command to deploy Redis Cluster
helm upgrade --install $RELEASE_NAME bitnami/redis-cluster \
  --namespace $NAMESPACE \
  --version $REDIS_CHART_VERSION \
  --set password="$REDIS_PASSWORD" \
  --set username="$REDIS_USER" \
  --set cluster.nodes=3 \
  --set cluster.replicas=0 \
  --set redis.metrics.enabled=true

# Wait for the Redis cluster to be ready
echo "Waiting for Redis cluster to be ready..."
kubectl wait --namespace $NAMESPACE --for=condition=ready pod -l app.kubernetes.io/name=redis-cluster --timeout=180s

# Create a Kubernetes secret for RedisInsight environment variables
kubectl create secret generic redis-cluster-client-credentials \
  --from-literal=redis-host="$RELEASE_NAME-headless.$NAMESPACE.svc.cluster.local" \
  --from-literal=redis-port='6379' \
  --from-literal=redis-password="$REDIS_PASSWORD" \
  --from-literal=redis-user="$REDIS_USER"\
  --namespace $NAMESPACE
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: redisinsight-service
  labels:
    app: redisinsight
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 5540
  selector:
    app: redisinsight
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redisinsight
  labels:
    app: redisinsight
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redisinsight
  template:
    metadata:
      labels:
        app: redisinsight
    spec:
      containers:
        - name: redisinsight
          image: redis/redisinsight:latest
          imagePullPolicy: IfNotPresent
          volumeMounts:
            - name: redisinsight
              mountPath: /data
          ports:
            - containerPort: 5540
              protocol: TCP
          env:
            - name: RI_HOST
              valueFrom:
                secretKeyRef:
                  name: redis-cluster-client-credentials
                  key: redis-host
            - name: RI_PORT
              valueFrom:
                secretKeyRef:
                  name: redis-cluster-client-credentials
                  key: redis-port
            - name: RI_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: redis-cluster-client-credentials
                  key: redis-password
            - name: RI_USER
              valueFrom:
                secretKeyRef:
                  name: redis-cluster-client-credentials
                  key: redis-user
      volumes:
        - name: redisinsight
          emptyDir: {}
EOF
echo "Redis cluster and RedisInsight have been deployed successfully."




helm upgrade --install argocd argo/argo-cd --namespace argocd --create-namespace \
  --set server.service.type=ClusterIP \
  --set server.ingress.enabled=false
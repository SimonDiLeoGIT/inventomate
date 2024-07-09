import { useEffect } from "react"

export const TermsAndCondition = () => {

  useEffect(() => {
    document.title = 'InventoMate | Terms and Conditions'
  }, [])

  return (
    <main className="m-auto my-4 w-11/12 max-w-3xl">
      <h2 className="font-bold text-xl -text--color-semidark-violet">Terms and Conditions</h2>
      <ol className="my-4">
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">1. Introduction and Acceptance of Terms</strong>
          <p className="my-2">
            Welcome to InventoMate, a platform designed to offer better inventory control for various businesses. Before using our services, we ask that you carefully read and accept the following terms and conditions of use. By accessing or using InventoMate, you agree to be legally bound by these terms and conditions, as well as all policies and guidelines incorporated by reference. If you do not agree to any of these terms, please do not use our system.
          </p>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">2. Registration and User Accounts</strong>
          <ol className="my-2">
            <li>
              <strong> 2.1 Registration Process:</strong>
              <p className="my-2">
                To access the services provided by InventoMate, it is necessary to complete the registration process. This involves providing truthful, complete, and up-to-date information as requested in the registration form. By registering, you agree to receive communications related to your account and InventoMate services.
              </p>
            </li>
            <li>
              <strong>2.2 Account Security:</strong>
              <p className="my-2">
                You are responsible for maintaining the confidentiality of your password and for all activity that occurs on your account. In case you suspect any unauthorized use of your account or any other security breach, the system offers a secure mechanism to change your password.
              </p>
            </li>
            <li>
              <strong>2.3 Registration via Google:</strong>
              <p className="my-2">
                As an alternative to standard registration, you may choose to register using your Google account. By doing so, you authorize InventoMate to access and use information from your Google account in accordance with our privacy policy.
              </p>
            </li>
            <li>
              <strong>2.4 Security Mechanisms:</strong>
              <p className="my-2">
                InventoMate utilizes advanced security mechanisms provided by Auth0 to protect your account and the data you handle on our platform. These include, among others, multi-factor authentication and data encryption to ensure the confidentiality and integrity of information.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">3. Intellectual Property</strong>
          <ol className="my-2">
            <li>
              <strong>3.1 Copyright:</strong>
              <p className="my-2">
                All copyrights, trademarks, patents, and other intellectual property rights related to InventoMate and its content (including, but not limited to, software, design, graphics, text, images, logos, and other materials) are the exclusive property of InventarIA or its licensors.
              </p>
            </li>
            <li>
              <strong>3.2 Use of Content:</strong>
              <p className="my-2">
                Accessing and using InventoMate does not grant any rights to the copyrighted or otherwise protected content, except for personal and non-commercial use within the scope intended by the system. Any reproduction, distribution, modification, or unauthorized use of the content is expressly prohibited without the prior written consent of InventarIA.
              </p>
            </li>
            <li>
              <strong>3.3 Trademarks:</strong>
              <p className="my-2">
                All trademarks, service marks, and trade names used in InventoMate are the property of their respective owners and are protected by applicable intellectual property laws. Unauthorized use is strictly prohibited and may constitute a violation of copyright or trademark laws.
              </p>
            </li>
            <li>
              <strong>3.4 User Collaborations and Contributions:</strong>
              <p className="my-2">
                Any collaboration, comment, suggestion, idea, or other content provided by users as part of using InventoMate shall be considered non-confidential and shall become the property of InventarIA, which shall have the right to use it without restrictions for any commercial or other purpose, without compensation to the user.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">4. Privacy</strong>
          <ol className="my-2">
            <li>
              <strong>4.1 Collection and Use of Information:</strong>
              <p className="my-2">
                InventoMate collects and uses certain personal and non-personal information from users in accordance with our Privacy Policy. This information may include login data, email address, and username. We use this information to provide and improve our services, ensuring platform security.
              </p>
            </li>
            <li>
              <strong>4.2 Information Protection:</strong>
              <p className="my-2">
                We are committed to protecting the privacy and security of your personal information. We implement technical, administrative, and physical security measures, including the use of Auth0, a leading identity security provider, to protect your data against unauthorized access, disclosure, alteration, or destruction.
              </p>
            </li>
            <li>
              <strong>4.3 Sharing Information:</strong>
              <p className="my-2">
                We do not share your personal information with third parties except when necessary to provide our services, comply with the law, or protect our rights, property, or safety, or when we obtain your prior consent to do so.
              </p>
            </li>
            <li>
              <strong>4.4 Consent:</strong>
              <p className="my-2">
                By using InventoMate, you consent to the collection, use, and disclosure of your personal information in accordance with this privacy section and our Privacy Policy.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">5. User Responsibilities</strong>
          <ol className="my-2">
            <li>
              <strong>5.1 Acceptable Use:</strong>
              <p className="my-2">
                By using InventoMate, you agree to comply with all applicable laws, regulations, and rules. You must not use the system in a way that interferes with or disrupts its operation or the security of other users.
              </p>
            </li>
            <li>
              <strong>5.2 Access to Client Database:</strong>
              <p className="my-2">
                As a user of InventoMate, you understand and agree that access to the client database is subject to the policies and procedures established by the client company. You agree to use this information solely for the purpose of generating reports requested through InventoMate and not to disclose or misuse client data.
              </p>
            </li>
            <li>
              <strong>5.3 Maintenance of Security:</strong>
              <p className="my-2">
                You are responsible for maintaining the security of your account, including the confidentiality of your password and any activity performed with your account. You must promptly notify InventoMate of any unauthorized use of your account or any other security breach.
              </p>
            </li>
            <li>
              <strong>5.4 Respect for Intellectual Property Rights:</strong>
              <p className="my-2">
                You must respect the intellectual property rights of InventarIA and third parties when using InventoMate. You must not copy, distribute, modify, or otherwise use any content within the system without the prior written consent of the respective owner.
              </p>
            </li>
            <li>
              <strong>5.5 Collaboration and Communication:</strong>
              <p className="my-2">
                You agree to collaborate and communicate constructively and respectfully with other users and the InventoMate support team. Any abusive, harassing, or inappropriate behavior will not be tolerated and may result in the termination of your account.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">6. InventarIA Responsibilities</strong>
          <ol className="my-2">
            <li>
              <strong>6.1 Service Availability:</strong>
              <p className="my-2">
                InventarIA is committed to providing InventoMate in a continuous and reliable manner. However, we do not guarantee that the system is free from interruptions.
              </p>
            </li>
            <li>
              <strong>6.2 Support and Maintenance:</strong>
              <p className="my-2">
                We strive to provide timely and effective technical support to our users. However, InventarIA is not liable for any loss of data, damage, or harm that may arise as a result of using or the inability to use InventoMate, including, among others, service interruptions, software errors, or technical failures.
              </p>
            </li>
            <li>
              <strong>6.3 Updates and Enhancements:</strong>
              <p className="my-2">
                We reserve the right to make changes, updates, or improvements to InventoMate at any time and without prior notice. This may include adding or removing features, modifying the user interface, or updating underlying technology.
              </p>
            </li>
            <li>
              <strong>6.4 Limitation of Liability:</strong>
              <p className="my-2">
                In no event shall InventarIA be liable to you or any third party for direct, indirect, incidental, special, consequential, or punitive damages arising out of the use or inability to use InventoMate, even if InventarIA has been advised of the possibility of such damages.
              </p>
            </li>
            <li>
              <strong>6.5 Legal Compliance:</strong>
              <p className="my-2">
                We are committed to complying with all applicable laws and regulations regarding the provision of our services and the treatment of user information. However, we do not guarantee that the use of InventoMate complies with the specific requirements of each jurisdiction.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">7. Access to Client Database</strong>
          <ol className="my-2">
            <li>
              <strong>7.1 Authorized Access:</strong>
              <p className="my-2">
                InventoMate requires access to the client database to provide its inventory management services. The client company grants InventarIA and authorized users limited and secure access to their database for the sole purpose of generating reports and facilitating inventory management.
              </p>
            </li>
            <li>
              <strong>7.2 Confidentiality of Client Data:</strong>
              <p className="my-2">
                InventarIA is committed to maintaining the confidentiality of client data and using it solely for the intended purpose. Strict access, use, or disclosure of client data for any other purpose than providing services related to InventoMate is strictly prohibited.
              </p>
            </li>
            <li>
              <strong>7.3 Data Security:</strong>
              <p className="my-2">
                Technical, administrative, and physical security measures are implemented to protect client data against unauthorized access, disclosure, alteration, or destruction. This includes the use of encryption, authentication, and other security controls provided by Auth0.
              </p>
            </li>
            <li>
              <strong>7.4 Data Retention:</strong>
              <p className="my-2">
                Client data is retained only for the period necessary to fulfill the purposes for which it was collected, unless longer retention is required by law or applicable regulation.
              </p>
            </li>
            <li>
              <strong>7.5 Legal Compliance:</strong>
              <p className="my-2">
                InventarIA is committed to complying with all applicable laws and regulations regarding the management of client data, including, among others, data protection and privacy laws.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">8. Modifications and Termination of Service</strong>
          <ol className="my-2">
            <li>
              <strong>8.1 Changes to the Service:</strong>
              <p className="my-2">
                InventarIA reserves the right to make changes, updates, or improvements to the InventoMate service at any time and without prior notice. These changes may include the addition or removal of features, modification of the user interface, or updating of the underlying technology. Users will be notified of such changes through notifications in the service or other appropriate means.
              </p>
            </li>
            <li>
              <strong>8.2 Termination of User Account:</strong>
              <p className="my-2">
                InventarIA reserves the right to terminate or suspend a user's account in case of violation of the terms and conditions, fraudulent activity, or any other behavior deemed inappropriate or harmful to the service or its users. In the event of account termination, the user will lose access to the service and any data associated with their account.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg -text--color-mate-dark-violet">9. General Provisions</strong>
          <ol className="my-2">
            <li>
              <strong>9.1 Applicable Law:</strong>
              <p className="my-2">
                These terms and conditions shall be governed and construed in accordance with the laws of the country/jurisdiction without regard to its conflict of law provisions.
              </p>
            </li>
            <li>
              <strong>9.2 Dispute Resolution:</strong>
              <p className="my-2">
                Any dispute, controversy, or claim arising out of or relating to these terms and conditions, including their interpretation, performance, or validity, shall be settled by binding arbitration in accordance with the rules of commercial arbitration by one or more arbitrators appointed in accordance with such rules.
              </p>
            </li>
            <li>
              <strong>9.3 Waiver:</strong>
              <p className="my-2">
                The failure of InventarIA to exercise or enforce any right or provision of these terms and conditions shall not constitute a waiver of such right or provision.
              </p>
            </li>
            <li>
              <strong>9.4 Severability:</strong>
              <p className="my-2">
                If any provision of these terms and conditions is held to be invalid or unenforceable by a court or other competent authority, such invalidity or unenforceability shall not affect the validity or enforceability of the remaining provisions which shall remain in full force and effect.
              </p>
            </li>
          </ol>
        </li>
      </ol>
    </main>
  )
}
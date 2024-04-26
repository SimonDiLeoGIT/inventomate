import json

# Cargar datos desde el archivo JSON
with open('valoresCompletos.json', 'r') as file:
    data = json.load(file)

# Generar el contenido de LaTeX
latex_content = r'''
\documentclass{article}
\usepackage[spanish]{babel} % Paquete babel con el idioma español
\usepackage{graphicx}
\usepackage{geometry} % Para ajustar los márgenes
\usepackage{lipsum} 
\usepackage{changepage}
\usepackage{libertinus} % Cambiar la fuente a Libertinus
\usepackage{hyperref}
\usepackage{xcolor}
\usepackage{ulem}

% Ajustes de los márgenes
\geometry{
    left=2cm,
    right=2cm,
    top=2cm,
    bottom=2cm
}

\renewcommand{\thesubsection}{\arabic{subsection}}
\begin{document}

% Encabezado con el logo de la empresa, el título y la fecha
\begin{picture}(0,0)
    \put(-20,-35){\includegraphics[width=0.15\textwidth]{logo.png}} 
\end{picture}
\begin{center}
    {\fontsize{22pt}{24pt}\selectfont\textbf{Informe de Tendencias}}
    \quad
\end{center}
\begin{flushright}
    {\small\today} 
\end{flushright}
\hrule % Línea divisora

\vspace{1\baselineskip} % Espacio vertical antes de la primera sección
'''

# Iterar sobre las tendencias del JSON
for trend in data['trends']:
    category_name = trend['category_name']
    latex_content += r'''
\section*{''' + category_name + r'''}
\setcounter{subsection}{0} % Reiniciar el contador de subsección
'''

    # Iterar sobre los productos de la categoría
    for product in trend['products']:
        product_name = product['name']
        product_currency = product['additional_info']['buy_box_winner']['currency_id']
        product_price = product['additional_info']['buy_box_winner']['price']
        product_description = product['additional_info']['short_description']['content']
        
        # Formatear las características del producto como una lista
        product_attributes = "\n".join(["    \item \\textbf {" + attr['name'] + ":} " + attr['value_name'] for attr in product['attributes']])

        latex_content += r'''
\begin{adjustwidth}{2em}{}

\subsection{\uline{\href{''' + product['additional_info']['permalink']+'''}{''' + product_name + r'''}}}
\begin{itemize}
    \item \textbf{Precio:} ''' + product_currency + ' ' + product_price + r'''
    \item \textbf{Descripción:} ''' + product_description + r'''
    \item \textbf{Características:} 
    \begin{itemize}
    '''+product_attributes + r'''
    \end{itemize}
\end{itemize}

\vspace{1\baselineskip} % Espacio vertical después de la última sección
\end{adjustwidth}

'''

latex_content += r'''


\end{document}
'''

# Guardar el contenido LaTeX en un archivo .tex
with open('resultado.tex', 'w') as file:
    file.write(latex_content)

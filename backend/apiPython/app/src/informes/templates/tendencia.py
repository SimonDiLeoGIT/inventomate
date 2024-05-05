import json
import os
import subprocess

def json_to_latex(data):
    # Generar el contenido de LaTeX
    latex_content = r'''
    \documentclass{article}
    \usepackage[spanish]{babel}
    \usepackage{graphicx}
    \usepackage{geometry}
    \usepackage{lipsum} 
    \usepackage{changepage}
    \usepackage{hyperref}
    \usepackage{xcolor}
    \usepackage{ulem}

    % Ajustes de los margenes
    \geometry{
        left=2cm,
        right=2cm,
        top=2cm,
        bottom=2cm
    }

    \renewcommand{\thesubsection}{\arabic{subsection}}
    \begin{document}

    % Encabezado con el logo de la empresa, el titulo y la fecha
    \begin{picture}(0,0)
        \put(-20,-35){\includegraphics[width=0.15\textwidth]{../static/logo.png}} 
    \end{picture}
    \begin{center}
        {\fontsize{22pt}{24pt}\selectfont\textbf{Informe de Tendencia}}
    \end{center}
    \vspace{1\baselineskip} % Espacio vertical antes de la primera seccion
    '''

    # Iterar sobre las tendencias del JSON
    for trend in data['trends']:
        category_name = trend['category_name']
        latex_content += r'''
    \section*{''' + category_name + r'''}
    \setcounter{subsection}{0} % Reiniciar el contador de subseccion
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

    \subsection{\underline{\href{''' + product['additional_info']['permalink']+r'''}{''' + product_name + r'''}}}
    \begin{itemize}
        \item \textbf{Precio:} ''' + product_currency + ' ' + product_price + r'''
        \item \textbf{Descripcion:} ''' + product_description + r'''
        \item \textbf{Caracteristicas:} 
        \begin{itemize}
        '''+product_attributes + r'''
        \end{itemize}
    \end{itemize}

    \vspace{1\baselineskip} % Espacio vertical despues de la ultima seccion
    \end{adjustwidth}

    '''

    latex_content += r'''
    \end{document}
    '''
    # Guardar el contenido LaTeX en un archivo .tex
    with open('app/src/resultado.tex', 'w', encoding='utf-8') as file:
        file.write(latex_content)

def latex_to_pdf(tex_file):
    # Ejecutar pdflatex para compilar el archivo LaTeX
    os.chdir("app/src")
    process = subprocess.Popen(['pdflatex', tex_file])
    process.communicate()  # Esperar a que termine la compilación Ruta al archivo LaTeX
    return 
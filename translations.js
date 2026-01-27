const translations = {
    en: {
        navHome: "Home",
        navProjects: "Projects",
        navFormation: "Formation",
        title: "Backend Web Developer",
        aboutMe: "Passionate about programming and new technologies. Primarily focused on deloping scalable web and desktop applications. I enjoy the idea of providing solutions to people's real-world problems.",
        btnContact: "Contact me",
        projectsTitle: "Projects",
        project1Title: "Web Catalog",
        project1Info: "This online catalog features a comprehensive administrative panel (item management). It also includes a role-based authentication system (user/admin) ensuring that only administrators can make changes. Dynamic filters and advanced search capabilities are also included.",
        project1Code: "Code",
        project2Title: "Catalog (desktop app)",
        project2Info: "This desktop application allows you to add, delete, and modify any item you want. It also includes quick and advanced search filters.",
        project2Code: "Code",
        formationsTitle: "Formation",
        course4Title: "C# Level 3 Course [WEB .NET]",
        course4Info: "Web application development using C# and ASP.NET Core to create robust and scalable sites.",
        course4Info2: "Implementing custom controls in ASP.NET to improve interaction in web applications.",
        course4Certificate: "Certificate",
        course3Title: "C# Level 2 Course [OPO + .NET + SQL]",
        course3Info: "Developing object-oriented applications using C# and the .NET framework.",
        course3Info2: "Implementation of SQL databases for efficient data management.",
        course3Certificate: "Certificate",
        course2Title: "C# Level 1 Course",
        course2Info: "Introduction to the C# language: syntax and basic structures.",
        course2Info2: "Flow control: conditionals and loops in C# programming.",
        course2Certificate: "Certificate",
        course1Title: "Programming Fundamentals Course (University Level)",
        course1Info: "Fundamental concepts of data structures and variables.",
        course1Info2: "Use of flow control structures: conditionals and loops.",
        course1Certificate: "Certificate",
        contactTitle: "Contact me",
        placeholderName: "Name",
        placeholderEmail: "Email",
        placeholderMessage: "Message",
        btnSend: "Send",
        footer: "© 2026 nicoDev - all rights reserved"
    },
    es: {
        navHome: "Inicio",
        navProjects: "Proyectos",
        navFormation: "Formación",
        title: "Desarrollador Web Backend",
        aboutMe: "Apasionado por la programación y las nuevas tecnologías. Enfocado principalmente en el desarrollo de aplicaciones web escalables y aplicaciones de escritorio. Me gusta la idea de poder ofrecer soluciones a problemas reales de las personas.",
        btnContact: "Contáctame",
        projectsTitle: "Proyectos",
        project1Title: "Catálogo Web",
        project1Info: "Cuenta con un panel administrativo completo (ABM de artículos). También posee un sistema de autenticación por roles (usuario/admin) que garantiza que solo los administradores puedan realizar cambios. Incluye filtros dinámicos y búsqueda avanzada.",
        project1Code: "Código",
        project2Title: "Catálogo (app de escritorio)",
        project2Info: "Permite la alta, baja y modificación de cualquier artículo que desees. También incluye filtros de búsqueda rápida y avanzada.",
        project2Code: "Código",
        formationsTitle: "Formación",
        course4Title: "Curso C# Nivel 3 [WEB .NET]",
        course4Info: "Desarrollo de aplicaciones web utilizando C# y ASP.NET Core para crear sitios robustos y escalables.",
        course4Info2: "Implementación de controles personalizados en ASP.NET para mejorar la interacción en aplicaciones web.",
        course4Certificate: "Certificado",
        course3Title: "Curso C# Nivel 2 [POO + .NET + SQL]",
        course3Info: "Desarrollo de aplicaciones orientadas a objetos usando C# y .NET framework.",
        course3Info2: "Implementación de bases de datos SQL para manejo eficiente de datos.",
        course3Certificate: "Certificado",
        course2Title: "Curso C# Nivel 1",
        course2Info: "Introducción al lenguaje C#: sintaxis y estructuras básicas.",
        course2Info2: "Control de flujo: condicionales y bucles en programación C#.",
        course2Certificate: "Certificado",
        course1Title: "Curso fundamentos de la programación (nivel universidad)",
        course1Info: "Conceptos fundamentales de estructuras de datos y variables.",
        course1Info2: "Uso de estructuras de control de flujo: condicionales y bucles.",
        course1Certificate: "Certificado",
        contactTitle: "Contáctame",
        placeholderName: "Nombre",
        placeholderEmail: "Email",
        placeholderMessage: "Mensaje",
        btnSend: "Enviar",
        footer: "© 2026 nicoDev - todos los derechos reservados"
    }
};

const languageToggle = document.getElementById('language-toggle');
const elementsToTranslate = document.querySelectorAll('[data-translate]');

function changeLanguage(lang){

    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    const translationSet = translations[lang];

    if(!translationSet) return;

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translationSet[key];

        if(translation){
            if(element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')){
                element.value = translation;
            }
            else if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'){
                element.placeholder = translation;
            }
            else{
                element.textContent = translation;
            }
            
        }
    });

    localStorage.setItem('preferredLang', lang);
}

window.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');

    const savedLang = localStorage.getItem('preferredLang') || 'en';
    
    languageToggle.checked = (savedLang === 'en');
    
    changeLanguage(savedLang);

    languageToggle.addEventListener('change', () => {
        const newLang = languageToggle.checked ? 'en' : 'es';
        changeLanguage(newLang);
    });
});
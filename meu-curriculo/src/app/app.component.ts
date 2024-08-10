import { Component,ViewEncapsulation  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'meu-curriculo';
  language: string = 'pt';  // Define a linguagem padrão como português
  selectedExperience: any;

  highlightTechnologies = ['Android Studio', 'MySQL', 'TypeScript', 'PHP', 'Ionic', 'VBA', 'Python', 'Scrum', 'Figma'];

  educationPt = [
    {
      institution: 'Universidade Positivo',
      degree: "Bacharelado em Engenharia de Software",
      period: '5º Período - Noturno',
      graduation: 'Dezembro 2025'
    },
    {
      institution: 'Microcamp',
      degree: 'Cursos Profissionalizantes em Hardware e Software',
      period: ''
    }
  ];

  educationEn = [
    {
      institution: 'Universidade Positivo',
      degree: "Bachelor's in Software Engineering",
      period: '5th Semester - Night Classes',
      graduation: 'December 2025'
    },
    {
      institution: 'Microcamp',
      degree: 'Professional Courses in Hardware and Software',
      period: ''
    }
  ];

  experiencesPt = [
    {
      title: 'Desenvolvedor Full Stack',
      company: 'Alphacode IT Solutions',
      location: 'Curitiba, Paraná, Brasil',
      startDate: 'Mar 2024',
      endDate: 'Atual',
      type: 'Presencial',
      responsibilities: [
        'Envolvido em projetos de desenvolvimento full-stack, incluindo a criação de aplicativos web e móveis.',
        'Utilização de Android Studio, MySQL, TypeScript, PHP e Ionic para oferecer soluções completas.',
        'Colaboração em projetos utilizando metodologias Scrum, garantindo gerenciamento eficaz.',
        'Focado na implementação e manutenção de aplicações com base em designs fornecidos via Figma.'
      ]
    },
    {
      title: 'Estagiário de Desenvolvimento em Automação',
      company: 'Votorantim',
      location: 'Curitiba, Paraná, Brasil',
      startDate: 'Jul 2023',
      endDate: 'Mar 2024',
      type: 'Híbrido',
      responsibilities: [
        'Participação no desenvolvimento de soluções utilizando VBA e Python, automatizando processos para aumentar a eficiência operacional.',
        'Contribuição para projetos de gestão de dados e relatórios.',
        'Integração de sistemas e fornecimento de suporte técnico em um ambiente de escritório.'
      ]
    },
    {
      title: 'Estagiário de Helpdesk',
      company: 'Employer Tudo do RH',
      location: 'Curitiba, Paraná, Brasil',
      startDate: 'Abr 2023',
      endDate: 'Jul 2023',
      type: 'Presencial',
      responsibilities: [
        'Prestação de suporte técnico, resolvendo questões relacionadas a hardware, software e redes.',
        'Diagnóstico e solução de problemas técnicos.',
        'Atualização regular de procedimentos e documentação de suporte.'
      ]
    },
    {
      title: 'Agente de Atendimento CX',
      company: 'Foundever',
      location: 'Curitiba, Paraná, Brasil',
      startDate: '2021',
      endDate: '2023',
      type: '',
      responsibilities: [
        'Atendimento ao cliente via chat online para os clientes Olist e PGMBM.',
        'Resolução de problemas logísticos, como pacotes atrasados ou perdidos.',
        'Captação de dados para casos legais relacionados ao desabamento das barragens de Mariana e Brumadinho.'
      ]
    }
  ];

  experiencesEn = [
    {
      title: 'Full Stack Developer',
      company: 'Alphacode IT Solutions',
      location: 'Curitiba, Paraná, Brazil',
      startDate: 'Mar 2024',
      endDate: 'Present',
      type: 'On-site',
      responsibilities: [
        'Engaged in full-stack development projects, including web and mobile applications.',
        'Utilized Android Studio, MySQL, TypeScript, PHP, and Ionic to deliver comprehensive solutions.',
        'Collaborated on projects using Scrum methodologies, ensuring effective project management.',
        'Focused on the implementation and maintenance of applications based on Figma designs.'
      ]
    },
    {
      title: 'Automations Developer Intern',
      company: 'Votorantim',
      location: 'Curitiba, Paraná, Brazil',
      startDate: 'Jul 2023',
      endDate: 'Mar 2024',
      type: 'Hybrid',
      responsibilities: [
        'Developed solutions using VBA and Python, automating processes to enhance operational efficiency.',
        'Contributed to data management and reporting projects.',
        'Integrated systems and provided technical support in an office environment.'
      ]
    },
    {
      title: 'Helpdesk Intern',
      company: 'Employer Tudo do RH',
      location: 'Curitiba, Paraná, Brazil',
      startDate: 'Apr 2023',
      endDate: 'Jul 2023',
      type: 'On-site',
      responsibilities: [
        'Provided technical support, resolving hardware, software, and network issues.',
        'Diagnosed and troubleshot technical problems.',
        'Regularly updated support procedures and documentation.'
      ]
    },
    {
      title: 'CX Support Agent',
      company: 'Foundever',
      location: 'Curitiba, Paraná, Brazil',
      startDate: '2021',
      endDate: '2023',
      type: '',
      responsibilities: [
        'Customer support via online chat for Olist and PGMBM clients.',
        'Resolved logistical issues such as delayed or lost packages.',
        'Collected data for legal cases related to the Mariana and Brumadinho dam collapses.'
      ]
    }
  ];
  clickedExperience: any;

  showDetails(exp: any) {
    this.selectedExperience = {
      ...exp,
      responsibilities: this.highlightResponsibilities(exp.responsibilities)
    };
  }

  hideDetails() {
    this.selectedExperience = null;
  }

  toggleDetails(exp: any) {
    if (this.clickedExperience === exp) {
      this.clickedExperience = null; 
    } else {
      this.clickedExperience = exp; 
    }
  }

  switchLanguage(lang: string) {
    this.language = lang;
  }

  // Método para destacar as tecnologias
  highlightTechnology(text: string): SafeHtml {
    this.highlightTechnologies.forEach(tech => {
      const regex = new RegExp(`\\b${tech}\\b`, 'gi');
      text = text.replace(regex, `<span class="badge">${tech}</span>`);
    });
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  // Método para destacar as tecnologias em todas as responsabilidades
  highlightResponsibilities(responsibilities: string[]): SafeHtml[] {
    return responsibilities.map(responsibility => this.highlightTechnology(responsibility));
  }

  get education() {
    return this.language === 'pt' ? this.educationPt : this.educationEn;
  }

  get experiences() {
    return this.language === 'pt' ? this.experiencesPt : this.experiencesEn;
  }

  constructor(private sanitizer: DomSanitizer) {}
}

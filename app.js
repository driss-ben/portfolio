const container = document.querySelector(".container");
const slides = document.querySelectorAll(".main");
const background = document.querySelector(".background-container");
const navbar = document.querySelector(".navbar");
const footer= document.getElementById("footer");
const bar=document.getElementById("bar");
let slide_number=0;
let switch_button=document.getElementById('switch-button');
const slide_one=document.getElementById("slide-one");
const slide_two=document.getElementById("slide-two");
const slide_three=document.getElementById("slide-three");
const slide_four=document.getElementById("slide-four");
const links=document.getElementById("links-container");
var links_displayed=false;
let isEnglish=false;
var translatorHidden=false;
const project_description_container=document.getElementById('project-description');
const project_popup=document.getElementById('project-details');
const openPopUpButtons = document.querySelectorAll('.open-popup-button');
const cv_container=document.getElementById('cv-link');
const enButton=document.getElementById('en-button')

async function toggleSlides(){
  footer.classList.toggle("hidden");
  container.classList.toggle("active");
  bar.classList.toggle("active");
  navbar.classList.toggle("blured");
  links.classList.toggle("display-links");
  
  slide_two.classList.toggle("hidden");
  slide_three.classList.toggle("hidden");
  slide_four.classList.toggle("hidden");

  slide_two.classList.toggle("shadow");
  slide_three.classList.toggle("shadow");
  slide_four.classList.toggle("shadow");

  await sleep(1);

  slide_two.classList.toggle("hidden");
  slide_three.classList.toggle("hidden");
  slide_four.classList.toggle("hidden");

  if(links_displayed){
    slide_one.removeAttribute("onclick");
    slide_two.removeAttribute("onclick");
    slide_three.removeAttribute("onclick");
    slide_four.removeAttribute("onclick");
  }
  else{
    slide_one.setAttribute("onclick", "scrollToSlide(0);");
    slide_two.setAttribute("onclick", "scrollToSlide(1);");
    slide_three.setAttribute("onclick", "scrollToSlide(2);");
    slide_four.setAttribute("onclick", "scrollToSlide(3);");
  }

  links_displayed=!links_displayed;

  setRotationGradianAngle()
}

function hoverLink(slide_id){
  const slide=document.getElementById(slide_id);
  slide.classList.toggle("hoverd");
}


function sleep(ms){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let phrases=["A Fullstack Developer & A Designer"];
let phraseToDisplay=0;

const tw=document.getElementById('typing-description');
let sleepTime=70;


const writeLoop=async()=>{

  while(true){
    const word=phrases[phraseToDisplay];
    for(let i=0; i<word.length;i++){
      tw.innerHTML=word.substring(0,i+1);
      await sleep(sleepTime);
    }

    await sleep(800);

    for(let i=word.length-1; i>=0;i--){
      tw.innerHTML=word.substring(0,i-1);
      await sleep(sleepTime/4);
    }
    phraseToDisplay=(phraseToDisplay+1)%phrases.length;
    await sleep(800);
  }
};
writeLoop();

async function scrollToSlide(slide_id){
  let slide='';
  if(slide_id===0) slide='slide-one-placeholder';
  if(slide_id===1) slide='slide-two-placeholder';
  if(slide_id===2) slide='slide-three-placeholder';
  if(slide_id===3) slide='slide-four-placeholder';
  if(slide_id===0 || slide_id===1 || slide_id===2 || slide_id===3){
    slide_number=slide_id;
  }
  var targetSlide = document.getElementById(slide);
  toggleSlides();
  await sleep(300);
  targetSlide.scrollIntoView({ behavior: 'smooth' , block: 'start', inline: 'start' });
}

function justScrool(slide_id){
  let slide='';
  if(slide_id===0) slide='slide-one-placeholder';
  if(slide_id===1) slide='slide-two-placeholder';
  if(slide_id===2) slide='slide-three-placeholder';
  if(slide_id===3) slide='slide-four-placeholder';
  if(slide_id===0 || slide_id===1 || slide_id===2 || slide_id===3){
    slide_number=slide_id;
  }
  var targetSlide = document.getElementById(slide);
  targetSlide.scrollIntoView({ behavior: 'smooth' , block: 'start', inline: 'start' });
}

async function setRotationGradianAngle(){
  await sleep(20);
  slides.forEach((slide, index) => {
    if(index==8){slide.style.backgroundColor='black'}
    else{
      const height = slide.clientHeight;
      var angle = Math.atan(2*height / (1*slide.offsetWidth)) * (180 / Math.PI);
      if(index%2==1){
        angle=180-angle;
      }
      const gradient = 'linear-gradient('+angle+'deg, white, black,#aaa)';
      slide.style.backgroundImage = gradient;      
    }

  });

  

}


const sr=ScrollReveal({
  reset: false,
  origin:'top',
  distance:'60px',
  duration:1250,
  delay:100,
})

sr.reveal('.img-container', {delay:500, duration:2000, distance:'80px' });
sr.reveal('.about-container', {origin:'bottom',delay:500, duration:2000, distance:'80px'});
sr.reveal('.about-me-card', {origin:'right'});
sr.reveal('.personality-container', {origin:'left'});
sr.reveal('.time-line-container', {delay:700});
sr.reveal('.projects-container .project-card', {interval:200, delay:70});
sr.reveal('.skills-top-container', {origin:'left', delay:500});
sr.reveal('.skills-top-container .skill-item', {origin:'left',interval:80, delay:50, distance:'20px'});
sr.reveal('.wrapper-message', {delay:400});

function openProjectDetails(projetc_id, button){

  button.classList.remove("shining-text");
  const selectedProject=data.slide_three.contents.projects[projetc_id];

  if(selectedProject.display_in_column){
    project_description_container.classList.add("flex-column");
  }
  else{
    project_description_container.classList.remove("flex-column");
  }

  let description= isEnglish? selectedProject.description.en : selectedProject.description.fr;

  project_description_container.innerHTML=description;

  switch_button.classList.add("hidden-by-opacity");

  project_popup.classList.remove("inactive");
  project_popup.classList.add("active");
  document.documentElement.style.overflow = 'hidden';
}

async function closeProjectDetails(){
  stopTheVideoIfExist();
  project_popup.classList.add("inactive");
  project_popup.classList.remove("active");
  await sleep(500);
  switch_button.classList.remove("hidden-by-opacity");
  document.documentElement.style.overflow = 'auto';
}


switch_button.addEventListener('click', function() {
  enButton.classList.remove("shining-text")
  isEnglish=!isEnglish;
  let translateTo=isEnglish?'en':'fr';
  this.classList.toggle('switch-active');
  translate(translateTo);
});


function hideContainer(divId) {
  const div = document.getElementById(divId);
  let opacity = 1;
  function updateOpacity() {
      opacity -= 0.02;
      div.style.opacity = opacity;

          if(opacity > 0){
              requestAnimationFrame(updateOpacity);
          }
          else{
            div.style.display='none';
          }
  }
  requestAnimationFrame(updateOpacity);
}

function getContactFormNotif(notifIndex){
  return isEnglish? data.contact_form_notif[notifIndex].en: data.contact_form_notif[notifIndex].fr;
}

function sendEmail(){
  let name_input=document.getElementById('sender-name');
  let email_input=document.getElementById('sender-email');
  let phone_input=document.getElementById('sender-phone');
  let website_input=document.getElementById('sender-website');
  let message_input=document.getElementById('sender-message');

  if(email_input.value=="" || message_input.value=="" ){
    const messages=getContactFormNotif(0);
    Swal.fire({
      text: messages[0],
      icon: "warning"
    });   
  }
  else{
    let body = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <span style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 5px; display:block;">New Contact Form Submission</span>
        <p><strong>From:</strong></p>
        <p style="margin: 10px 0;"><strong>Name:</strong> ${name_input.value}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> ${email_input.value}</p>
        <p style="margin: 10px 0;"><strong>Phone Number:</strong> ${phone_input.value}</p>
        <p style="margin: 10px 0;"><strong>Website:</strong> ${website_input.value}</p>
  
        <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
  
        <p><strong>Message:</strong></p>
        <p style="background-color: #e6f7ff; padding: 15px; border-radius: 5px; border: 1px solid #b3e0ff; color: #004080;">
          ${message_input.value}
        </p>
      </div>
      <p style="color: #888; font-size: 12px; text-align: center; margin-top: 20px;">
        This email was generated from my website contact form.
      </p>
    </div>
  `;

    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "my.portfolio@gmail.com",
      Password : "14DB78B4BAEA846A51627B33643DBE41CD6D",
      To : 'driss.benkhaldoun@gmail.com',
      From : 'dbs.shopping.insa@gmail.com',
      Subject : "A new message from my portfolio",
      Body : body
    }).then(
      message => {
        if(message=="OK"){
          const messages=getContactFormNotif(1);
          Swal.fire({
            title: messages[0],
            text: messages[1],
            icon: "success"
          });
        }
        else{
          console.log(message);
          const messages=getContactFormNotif(2);
          Swal.fire({
            title: messages[0],
            text: messages[1],
            icon: "warning"
          });        
        }
      }
      );
    }
}

async function translate(translateTo) {
  translatePersonalityItemValues(translateTo);
  translateContactFormPlaceHolders(translateTo);
  translateMyIntro(translateTo);
  translateMyAcademicJourney(translateTo);
  translateButtons(translateTo);
  translateBigTitles(translateTo);
  translateSmallTitles(translateTo);
  translateProjectCards(translateTo);
  translateLinks(translateTo);
  translateFirstSlide(translateTo);
  changeCVPath(translateTo);
  
  openPopUpButtons.forEach(button => {
    const actions=isEnglish? data.actions.en : data.actions.fr
    button.textContent = actions[3] ;
  });

  setRotationGradianAngle();
}


function translatePersonalityItemValues(translateTo) {
  const newValues = data.slide_two.contents.personality[translateTo];
  const container = document.getElementById('personality-container');
  const items = container.getElementsByClassName('item');

  for (let i = 0; i < items.length; i++) {
    items[i].textContent = newValues[i];
  }
}


function translateContactFormPlaceHolders(translateTo){
  const newValues = data.slide_four.placeholders[translateTo];
  const container = document.getElementById('form');
  const items = container.getElementsByClassName('input-form');

  for (let i = 0; i < items.length; i++) {
    items[i].placeholder = newValues[i];
  }
}

function translateMyIntro(translateTo){
  const newValue=data.slide_two.contents.intro[translateTo];
  const myIntroContainer=document.getElementById('my-intro');
  myIntroContainer.textContent=newValue;
}

function translateMyAcademicJourney(translateTo){
  const newStudies=data.slide_two.contents.studies;
  const academicJourneyContainer=document.getElementById("academic-journey");
  const items = academicJourneyContainer.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    const pargraph=items[i].getElementsByTagName("p")[0];
    const dateZone=items[i].getElementsByClassName("date")[0];
    const step=newStudies[i];
    const description = step.description[translateTo];
    const date= step.date[translateTo];
    pargraph.textContent=description;
    dateZone.textContent=date;
  }

}


function translateBigTitles(translateTo){
  const newValues=data.slide_titles;
  const items = document.getElementsByClassName("big-slide-title");
  for (let i = 0; i < items.length; i++) {
    const normal_text=items[i].getElementsByClassName("normal-text")[0];
    const golden_text=items[i].getElementsByClassName("golden-text")[0];
    const subtitle=items[i].getElementsByClassName("subtitle")[0];

    const title=newValues[i];
    normal_text.textContent=title.normal[translateTo];
    golden_text.textContent=title.golden[translateTo];
    subtitle.textContent=title.sub_title[translateTo];
  }
}

function translateSmallTitles(translateTo){
  const newValues=data.small_titles;
  const items = document.getElementsByClassName("small-title");
  for (let i = 0; i < items.length; i++) {
    const small_title=newValues[i];
    items[i].textContent=small_title[translateTo];
  }
}

function translateButtons(translateTo){
  const newValues=data.actions[translateTo];
  const items = document.getElementsByClassName("transabled-button");
  for (let i = 0; i < items.length; i++) {
    items[i].textContent=newValues[i];
  }
}

function translateProjectCards(translateTo){
  const newValues=data.project_durations[translateTo];
  const items = document.getElementsByClassName("project-duration");
  for (let i = 0; i < items.length; i++) {
    items[i].textContent=newValues[i];
  }
}

function translateLinks(translateTo){
  const links_container=document.getElementById('links-container');
  const items=links_container.getElementsByTagName('a');
  const newValues=data.menu[translateTo];
  for (let i = 0; i < items.length; i++) {
    items[i].textContent=newValues[i];
  }
}

function translateFirstSlide(translateTo){
  const titles=data.slide_one.title;
  const greetings=document.getElementById('greetings');
  greetings.textContent=titles.normal[translateTo];
  const whoSpan=document.getElementById('who');
  whoSpan.textContent=titles.golden[translateTo];
  phrases=titles.sub_title[translateTo];
}

function changeCVPath(translateTo){
  const cv_path=data.cv_path[translateTo];
  cv_container.href=cv_path;
  cv_container.download="CV-DRISS-"+translateTo.toUpperCase();
}


function checkScrollEnd() {
  if (((window.innerHeight + window.scrollY +30) >= document.body.offsetHeight) && !links_displayed && !translatorHidden) {
      switch_button.classList.add("hidden-by-opacity");
      translatorHidden=true;
  }
}

function checkNotScrollEnd(){
    if (((window.innerHeight + window.scrollY +30) < document.body.offsetHeight) && !links_displayed && translatorHidden) {
      switch_button.classList.remove("hidden-by-opacity");
      translatorHidden=false;
  }
}
window.addEventListener('scroll', checkScrollEnd);
window.addEventListener('scroll', checkNotScrollEnd);

function stopTheVideoIfExist() {
  const video = document.getElementById('video-controller');
  if(video==null) return;
  video.pause();
  video.currentTime = 0;
}

const data = {
	"menu": {
		"en": ["HOME", "ABOUT ME", "EXPERIENCES", "CONTACT ME"],
		"fr": ["ACCUEIL", "À PROPOS DE MOI", "EXPÉRIENCES", "CONTACTEZ MOI"]
	},
	"slide_one": {
		"title": {
			"normal": { "en": "Hello, ", "fr": "Salut, " },
			"golden": { "en": "I'm", "fr": "Je suis" },
			"sub_title": {
				"en": ["A Software Engineer & A Designer", "A person who loves what he does !"],
				"fr": ["Un Ingénieur logiciel & Un Designer", "Une personne qui aime ce qu'il fait !"]
			}
		}
	},
	"slide_two": {
		"contents": {
			"intro": {
				"en": "As a passionate Software Engineer and Cybersecurity Engineer, with academic foundations from both INSA Centre Val de Loire and ENSA Agadir, I am now seeking new challenges. I am eager to leverage my expertise in computer development and cybersecurity to contribute to innovative projects that push the boundaries of technology while further honing my skills in a dynamic and forward-thinking environment.",
				"fr": "En tant qu'ingénieur logiciel et ingénieur en cybersécurité, avec des formations académiques à l'INSA Centre Val de Loire et à l'ENSA Agadir, je suis désormais à la recherche de nouveaux défis. Je suis impatient de mettre à profit mon expertise en développement informatique et en cybersécurité pour contribuer à des projets innovants qui repoussent les limites de la technologie, tout en perfectionnant mes compétences dans un environnement dynamique et avant-gardiste."
			},
			"personality": {
				"en": ["Creativity", "Flexibility", "Honest", "Motivation", "Punctuality", "Leadership", "Emotional intelligence", "Attention to detail", "Problem solver", "Diligent", "Team spirit","Curiosity"],
				"fr": ["Créativité", "Flexibilité", "Honnêteté", "Motivation", "Ponctualité", "Leadership", "Intelligence émotionnelle", "Attention aux détails", "Résolution de problèmes", "Assidu", "Esprit d'équipe","Curiosité"]
			},
			"studies": [
				{
					"date": {
						"en": "June 2018",
						"fr": "Juin 2018"
					},
					"description": {
						"en": "Obtain the baccalaureate in the mathematical sciences's option from Al Khawarizmi high school of Casablanca",
						"fr": "Obtention du baccalauréat en sciences mathématiques au lycée Al Khawarizmi de Casablanca"
					}
				},
				{
					"date": {
						"en": "September 2018",
						"fr": "Septembre 2018"
					},
					"description": {
						"en": "Software engineering student at the National School of Applied Sciences of Agadir (4 years)",
						"fr": "Étudiant en génie logiciel à l'École Nationale des Sciences Appliquées d'Agadir (4 ans)"
					}
				},
				{
					"date": {
						"en": "September 2022",
						"fr": "Septembre 2022"
					},
					"description": {
						"en": "Cybersecurity engineering student at the National Institute of Applied Sciences of Center Val de Loire in a dual diploma program (2 Years)",
						"fr": "Étudiant en cybersécurité à l'Institut National des Sciences Appliquées de Centre Val de Loire dans un programme de double diplôme (2 ans)"
					}
				},
			]
		}
	},
	"slide_three": {
		"contents": {
			"projects": [
        {
					"title": "C2C TEAM",
					"description": {
						"en": 
            `
            <div class="project-description-text-container">
              <span>Rakuten France - C2C TEAM</span>
              <div class="project-description-text">
                <p>
                  During my Final Year Project at Rakuten France, I had the invaluable opportunity to collaborate with the dynamic C2C team. Comprising 9 members from different nationalities, my mission as a back-end developper was to streamline the migration of carrier providers to the innovative ShipEngine platform. This initiative significantly enhanced the efficiency and dynamism of their management processes. Working within such a multicultural team provided me with a rich learning experience, exposing me to diverse perspectives and approaches to problem-solving.
                </p>
                <p>We leveraged a diverse set of technologies, including:</p>
                <ul>
                  <li><p>SpringBoot</p></li>
                  <li><p>RabbitMQ</p></li>
                  <li><p>Java EE</p></li>
                  <li><p>JUnit</p></li>
                  <li><p>Mockito</p></li>
                  <li><p>DevOps Practices</p></li>
                </ul>
                <p>
                  One of my key contributions was in transforming some functionalities from the monolithic project to the micro-services. This transition was underpinned by a robust hexagonal architecture, which facilitated greater scalability and maintainability. I also took on responsibilities for platform maintenance and rigorous integration testing, ensuring the system's reliability and performance. Furthermore, I have participated in migrating Rakuten's projects from BitBucket to GitHub, streamlining our version control processes and enhancing collaboration across the team.
                </p>
                <p>
                  This project helped me to develop and refine my technical skills. The practical experience I gained from this project has prepared me well for future challenges in the tech industry, equipping me with both the technical expertise and the collaborative skills necessary for success.
                </p>
              </div>
            
              <div class="popup-notification">
                <p>The demo of this experience is not available</p>
              </div>
            </div>
            `,
						"fr": 
            `
            <div class="project-description-text-container">
              <span>Rakuten France - ÉQUIPE C2C</span>
              <div class="project-description-text">
                <p>
                  Pendant mon Projet de Fin d'Études chez Rakuten France, j'ai eu l'opportunité inestimable de collaborer avec l'équipe dynamique C2C. Composée de 9 membres de différentes nationalités, ma mission en tant que développeur backend était de rationaliser la migration des transporteurs prestataires de Rakuten vers la plateforme innovante ShipEngine. Cette initiative a considérablement amélioré l'efficacité et la dynamique de leurs processus de gestion. Travailler au sein d'une équipe multiculturelle m'a offert une expérience d'apprentissage enrichissante, en m'exposant à des perspectives et des approches variées pour la résolution de problèmes.
                </p>
                <p>Nous avons utilisé une gamme variée de technologies, notamment :</p>
                <ul>
                  <li><p>SpringBoot</p></li>
                  <li><p>RabbitMQ</p></li>
                  <li><p>Java EE</p></li>
                  <li><p>JUnit</p></li>
                  <li><p>Mockito</p></li>
                  <li><p>Pratiques DevOps</p></li>
                </ul>
                <p>
                  Une de mes contributions clés a été de transformer quelques fonctionalites du projet monolithique vers des micro-services. Cette transition reposait sur une architecture hexagonale robuste, favorisant une plus grande scalabilité et maintenabilité. J'ai également pris en charge la maintenance de la plateforme et des tests d'intégration rigoureux, assurant la fiabilité et les performances du système. De plus, j'ai participé à la migration des projets de Rakuten de BitBucket vers GitHub, simplifiant nos processus de contrôle de version et renforçant la collaboration au sein de l'équipe.
                </p>
                <p>
                  Ce projet m'a aidé à développer et d'affiner mes compétences techniques. L'expérience pratique acquise m'a bien préparé pour les défis futurs dans l'industrie technologique, en me dotant à la fois de l'expertise technique et des compétences collaboratives nécessaires pour réussir.
                </p>
              </div>
              
              <div class="popup-notification">
                <p>La démonstration de cette expérience n'est pas disponible.</p>
              </div>
            </div>
            `
					},
          "display_in_column":true,
				},
				{
					"title": "DBSHOPPING",
					"description": {
						"en":
            `
            <div class="demo-place-holder">
              <video width="100%" controls id="video-controller">
                <source src="demos/dbshopping-demo-en.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="project-description-text-container">
              <span>INSA CVL - DBSHOPPING</span>
              <div class="project-description-text">
                <p>
                  Do you remember Amazon in its beginnings, focused solely on shipping books? Imagine a C2C e-commerce platform inspired by that concept, but tailored to modern needs. Welcome to DBSHOPPING, where our goal is to revolutionize the way books are bought and sold online.
                </p>
                <ul>
                  <li><p>Client-side interface for seamless book browsing and selection.</p></li>
                  <li><p>Orders are securely held until clients create an account or authenticate, ensuring personalized service and security.</p></li>
                  <li><p>Unique feature: Orders can include books from multiple libraries, significantly enhancing choice and availability.</p></li>
                  <li><p>Libraries register and await admin approval; upon approval, they receive access to their account features via email.</p></li>
                  <li><p>After each order, libraries are promptly notified on their dashboard about requested books, enabling efficient inventory management.</p></li>
                </ul>
                <p>
                  Developed independently in just 3 weeks, DBSHOPPING leverages SpringBoot for robust backend functionality and Thymeleaf for dynamic frontend rendering. This project showcases my ability to create scalable and secure web applications, integrating complex business logic seamlessly.
                </p>
                <p>
                  DBSHOPPING blends the charm of traditional book-buying with the convenience and reach of modern e-commerce. It prioritizes user security, library autonomy, and delivers a seamless transaction experience.
                </p>
              </div>
            </div>
            `,
						"fr":
            `
            <div class="demo-place-holder">
              <video width="100%" controls id="video-controller">
                <source src="demos/dbshopping-demo-en.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="project-description-text-container">
              <span>INSA CVL - DBSHOPPING</span>
              <div class="project-description-text">
                <p>
                  Vous souvenez-vous d'Amazon à ses débuts, centré uniquement sur l'expédition de livres ? Imaginez une plateforme de commerce électronique C2C inspirée par ce concept, mais adaptée aux besoins modernes. Bienvenue sur DBSHOPPING, où notre objectif est de révolutionner la façon dont les livres sont achetés et vendus en ligne.
                </p>
                <ul>
                  <li><p>Interface côté client pour une navigation et une sélection de livres fluides.</p></li>
                  <li><p>Les commandes sont sécurisées et conservées jusqu'à ce que les clients créent un compte ou s'authentifient, garantissant un service personnalisé et la sécurité des transactions.</p></li>
                  <li><p>Fonctionnalité unique : les commandes peuvent inclure des livres de plusieurs bibliothèques, augmentant ainsi le choix et la disponibilité.</p></li>
                  <li><p>Les bibliothèques s'inscrivent et attendent l'approbation de l'administrateur ; une fois approuvées, elles reçoivent un accès à leur compte par email.</p></li>
                  <li><p>Après chaque commande, les bibliothèques sont rapidement informées sur leur tableau de bord des livres demandés, facilitant ainsi la gestion efficace des stocks.</p></li>
                </ul>
                <p>
                  Réalisation en autonomie en seulement 3 semaines, DBSHOPPING utilise SpringBoot pour une fonctionnalité backend robuste et Thymeleaf pour un rendu frontend dynamique. Ce projet met en avant ma capacité à créer des applications web évolutives et sécurisées, intégrant de manière transparente une logique métier complexe.
                </p>
                <p>
                  DBSHOPPING marie le charme de l'achat traditionnel de livres avec la commodité et la portée du commerce électronique moderne. Il met l'accent sur la sécurité des utilisateurs, l'autonomie des bibliothèques et offre une expérience de transaction fluide.
                </p>
              </div>
            </div>
            `
					},
          "display_in_column":true,
				},
				{
					"title": "SPOT MANAGER",
					"description": {
						"en": 
            `
            <div class="demo-place-holder">
              <video width="60%" controls id="video-controller">
                <source src="demos/spot-manager-demo-en.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="project-description-text-container">
              <span>Spot In Leads - SPOT MANAGER</span>
              <div class="project-description-text">
                <p>
                  An innovative application developed using Flutter and Spring Boot. Its primary objective is to streamline the management of professional pages on various social media platforms.
                </p>
                <p>
                  Spot Manager simplifies the process of sharing posts across multiple social media channels like Facebook, Twitter, LinkedIn, and Instagram. With just a single click, users can publish a post simultaneously across all chosen platforms, eliminating the need for redundant postings.
                </p>
                <ul>
                  <li><p>Efficient message management: All incoming messages from different social media platforms are consolidated within Spot Manager. Users can view and respond to messages directly from the application, ensuring timely communication.</p></li>
                  <li><p>Centralized management: Content and interactions for professional pages are centralized, allowing users to efficiently manage reviews, messages, and comments.</p></li>
                  <li><p>Unified analytics dashboard: Spot Manager provides a comprehensive analytics dashboard where users can monitor engagement metrics across all connected social media platforms.</p></li>
                  <li><p>Secure authentication: Implemented secure authentication mechanisms to ensure the safety of user accounts and data across different social media integrations.</p></li>
                </ul>
                <p>
                  As the sole developer, I was responsible for the entire development of the app. The project spanned 4 months and marked my debut in mobile app development and first experience using Flutter.
                </p>
                <p>
                  Spot Manager showcases my ability to develop intuitive mobile applications that enhance productivity and simplify social media management for businesses, leveraging Flutter for cross-platform development and Spring Boot for robust backend functionality.
                </p>
              </div>
            </div>          
            `,
						"fr": 
            `
            <div class="demo-place-holder">
              <video width="60%" controls id="video-controller">
                <source src="demos/spot-manager-demo-en.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="project-description-text-container">
              <span>Spot In Leads - SPOT MANAGER</span>
              <div class="project-description-text">
                <p>
                  Une application innovante développée avec Flutter et Spring Boot. Son objectif principal est de simplifier la gestion des pages professionnelles sur les différents réseaux sociaux.
                </p>
                <p>
                  Spot Manager simplifie le processus de partage de publications sur plusieurs canaux de réseaux sociaux tels que Facebook, Twitter, LinkedIn et Instagram. En un seul clic, les utilisateurs peuvent publier une publication simultanément sur toutes les plateformes choisies, éliminant ainsi le besoin de publications redondantes.
                </p>
                <ul>
                  <li><p>Gestion efficace des messages : Tous les messages entrants des différents réseaux sociaux sont consolidés au sein de Spot Manager. Les utilisateurs peuvent consulter et répondre aux messages directement depuis l'application, assurant une communication rapide.</p></li>
                  <li><p>Gestion centralisée : Le contenu et les interactions des pages professionnelles sont centralisés, permettant aux utilisateurs de gérer efficacement les avis, les messages et les commentaires.</p></li>
                  <li><p>Tableau de bord d'analyse unifié : Spot Manager fournit un tableau de bord d'analyse où les utilisateurs peuvent suivre les métriques d'engagement sur tous les réseaux sociaux connectés.</p></li>
                  <li><p>Authentification sécurisée : Implémentation de mécanismes d'authentification sécurisés pour garantir la sécurité des comptes utilisateurs et des données sur différentes intégrations de réseaux sociaux.</p></li>
                </ul>
                <p>
                  En tant que seul développeur, j'ai été responsable du développement de l'application. Le projet a duré 4 mois et a marqué mes débuts dans le développement d'applications mobiles ainsi que ma première expérience avec Flutter.
                </p>
                <p>
                  Spot Manager démontre ma capacité à développer des applications mobiles intuitives qui améliorent la productivité et simplifient la gestion des réseaux sociaux pour les entreprises, en utilisant Flutter pour le développement multiplateforme et Spring Boot pour une fonctionnalité backend robuste.
                </p>
              </div>
            </div>         
            `
					},
          "display_in_column":false,
				},
				{
					"title": "LUNE PARC",
					"description": {
						"en": 
            `
            <div class="project-description-text-container">
              <span>Nava Business - LUNE PARC</span>
              <div class="project-description-text">
                <p>
                  Development of the web application "LUNE PARC" aimed at comprehensive management of a vehicle fleet, integrating legal and maintenance modules for streamlined operations.
                </p>
                <ul>
                  <li><p>Front-end development with React: Led by my classmate, we crafted a responsive and intuitive user interface using React, ensuring seamless interaction and usability.</p></li>
                  <li><p>Back-end development with Spring Boot: As the backend developer, I engineered scalable solutions with Spring Boot, enabling robust data management and seamless integration with the frontend.</p></li>
                  <li><p>Collaborative effort: Close collaboration between front-end and back-end teams ensured seamless integration of modules, enhancing overall performance and user experience.</p></li>
                </ul>
                <p>Our objective was to establish the following modules:</p>
                <ul>
                <li><p>Legal module:<br/>Implemented features to manage vehicle registration documents, including handling registrations, tax stickers, insurance policies, technical inspections, and vehicle contracts.</p></li>
                <li><p>Maintenance module:<br/>Developed functionalities for managing maintenance requests, schedules, and operations such as oil changes and tire replacements. Also managed inventory of spare parts.</p></li>
                </ul>
                <p>
                  LUNE PARC showcases our teamwork and technical expertise in delivering a robust web application tailored for efficient fleet management. This project demonstrated my proficiency in Spring Boot and backend development practices, laying a solid foundation for future collaborative projects.
                </p>
              </div>
              <div class="popup-notification">
                <p>The demo of this experience is not available</p>
              </div>
            </div>          
            `,
						"fr":
            `
            <div class="project-description-text-container">
              <span>Nava Business - LUNE PARC</span>
              <div class="project-description-text">
                <p>
                  Développement de l'application web "LUNE PARC" visant à la gestion complète d'un parc automobile, intégrant des modules juridiques et de maintenance pour des opérations rationalisées.
                </p>
                <ul>
                  <li><p>Développement front-end avec React : Sous la direction de mon camarade de classe, nous avons conçu une interface utilisateur réactive et intuitive avec React, garantissant une interaction fluide et une convivialité optimale.</p></li>
                  <li><p>Développement back-end avec Spring Boot : En tant que développeur back-end, j'ai mis au point des solutions évolutives avec Spring Boot, assurant une gestion robuste des données et une intégration sans faille avec le front-end.</p></li>
                  <li><p>Travail collaboratif : Une étroite collaboration entre les équipes front-end et back-end a assuré une intégration transparente des modules, améliorant ainsi les performances globales et l'expérience utilisateur.</p></li>
                </ul>
                <p>Notre objectif était d'établir les modules suivants :</p>
                <ul>
                  <li><p>Module juridique :<br/>Mise en place de fonctionnalités pour gérer les documents d'immatriculation des véhicules, y compris les immatriculations, les vignettes fiscales, les assurances, les inspections techniques et les contrats de véhicules.</p></li>
                  <li><p>Module de maintenance :<br/>Développement de fonctionnalités pour gérer les demandes de maintenance, les plannings et les opérations telles que les changements d'huile et le remplacement des pneus. Gestion également des stocks de pièces de rechange.</p></li>
                </ul>
                <p>
                  LUNE PARC illustre notre travail d'équipe et notre expertise technique dans la création d'une application web robuste adaptée à la gestion efficace de flottes. Ce projet a démontré ma maîtrise de Spring Boot et des pratiques de développement back-end, posant ainsi les bases solides pour des projets collaboratifs futurs.
                </p>
              </div>
              <div class="popup-notification">
                <p>La démonstration de cette expérience n'est pas disponible</p>
              </div>
            </div>
            `
					},
          "display_in_column":true,
				},
				{
					"title": "BUILDING CONSTRUCTOR",
					"description": {
						"en": 
            `
            <div class="project-description-text-container">
              <span>BUILDING CONSTRUCTOR</span>
              <div class="project-description-text">
                <p>
                  One of my best experiences was working on the academic project "Building Constructor." I was part of a dedicated team of 5 students. Together, we developed a comprehensive web application using JEE and MySQL to manage a residential building construction business. The project involved extensive planning, requirement specification, and collaborative development.
                </p>
                <ul>
                  <li><p>Requirements Specification: We meticulously gathered and specified the requirements to ensure the application met the needs of a construction business.</p></li>
                  <li><p>Documentation: Drafted a detailed requirements document outlining the scope, objectives, and functionalities of the application.</p></li>
                  <li><p>Design and Development: Designed and developed the web application to manage various aspects of the construction business, including:</p>
                    <ul>
                      <li><p>Expenses: Tracking and managing all construction-related expenses.</p></li>
                      <li><p>Sales: Recording and managing sales transactions and revenue.</p></li>
                      <li><p>Purchase Requests: Handling and processing requests for purchasing materials and supplies.</p></li>
                      <li><p>Inventory: Managing stock levels of construction materials and supplies.</p></li>
                      <li><p>Clients: Maintaining a database of clients and managing client interactions.</p></li>
                      <li><p>Administrators: Overseeing the administration and management aspects of the business.</p></li>
                      <li><p>Employees: Managing employee records, assignments, and performance.</p></li>
                      <li><p>Salaries: Calculating and disbursing employee salaries.</p></li>
                    </ul>
                  </li>
                </ul>
                <p>
                  Our collaborative effort involved regular discussions and decision-making processes. Whenever a team member suggested a new feature, we would collectively discuss its feasibility and potential impact before making a decision. This approach ensured that all perspectives were considered, and the best possible solutions were implemented. In addition to my role as a developer, I also took on the responsibility of designing marketing materials for our project. I designed some flyers, a logo and business cards for both the team and the project, showcasing my skills in graphic design.
                </p>
                <p>
                  Building Constructor showcases our ability to work together effectively on a large-scale project, addressing both technical and managerial aspects of a construction business. This project helped us develop skills in requirement analysis, documentation, full-stack web development, and graphic design.
                </p>
              </div>
              <div class="popup-notification">
                <p>The demo of this experience is not available</p>
              </div>
            </div>          
            `,
						"fr":
            `
            <div class="project-description-text-container">
              <span>BUILDING CONSTRUCTOR</span>
              <div class="project-description-text">
                <p>
                  L'une de mes meilleures expériences a été de travailler sur le projet académique "Building Constructor". J'ai fait partie d'une équipe dévouée de 5 étudiants. Ensemble, nous avons développé une application web complète utilisant JEE et MySQL pour gérer une entreprise de construction de bâtiments résidentiels. Le projet a impliqué une planification approfondie, la spécification des exigences et un développement collaboratif.
                </p>
                <ul>
                  <li><p>Spécification des exigences : Nous avons recueilli et spécifié méticuleusement les exigences pour garantir que l'application réponde aux besoins d'une entreprise de construction.</p></li>
                  <li><p>Documentation : Nous avons rédigé un document de spécifications détaillé décrivant la portée, les objectifs et les fonctionnalités de l'application.</p></li>
                  <li><p>Conception et développement : Nous avons conçu et développé l'application web pour gérer divers aspects de l'entreprise de construction, notamment :</p>
                    <ul>
                      <li><p>Dépenses : Suivi et gestion de toutes les dépenses liées à la construction.</p></li>
                      <li><p>Ventes : Enregistrement et gestion des transactions de vente et des revenus.</p></li>
                      <li><p>Demandes d'achats : Gestion et traitement des demandes d'achat de matériaux et de fournitures.</p></li>
                      <li><p>Stock : Gestion des niveaux de stock des matériaux et fournitures de construction.</p></li>
                      <li><p>Clients : Maintien d'une base de données des clients et gestion des interactions avec eux.</p></li>
                      <li><p>Administrateurs : Supervision des aspects administratifs et de gestion de l'entreprise.</p></li>
                      <li><p>Employés : Gestion des dossiers des employés, des affectations et des performances.</p></li>
                      <li><p>Salaires : Calcul et distribution des salaires des employés.</p></li>
                    </ul>
                  </li>
                </ul>
                <p>
                  Notre effort collaboratif impliquait des discussions régulières et des processus de prise de décision. Chaque fois qu'un membre de l'équipe suggérait une nouvelle fonctionnalité, nous en discutions collectivement la faisabilité et l'impact potentiel avant de prendre une décision. Cette approche garantissait que toutes les perspectives étaient prises en compte et que les meilleures solutions possibles étaient mises en œuvre. En plus de mon rôle de développeur, j'ai également pris la responsabilité de concevoir les supports marketing de notre projet. J'ai conçu des flyers, un logo et des cartes de visite pour l'équipe et le projet, montrant mes compétences en design graphique.
                </p>
                <p>
                  Building Constructor met en avant notre capacité à travailler ensemble efficacement sur un projet à grande échelle, en abordant à la fois les aspects techniques et de gestion d'une entreprise de construction. Ce projet nous a aidé à développer des compétences en analyse des besoins, documentation, développement web full-stack et design graphique.
                </p>
              </div>
              <div class="popup-notification">
                <p>La démonstration de cette expérience n'est pas disponible</p>
              </div>
            </div>
            `
					},
          "display_in_column":true,
				},
				{
					"title": "MUAT",
					"description": {
						"en":
            `
            <div class="demo-place-holder">
              <video width="100%" controls id="video-controller">
                <source src="demos/muat-demo-en.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="project-description-text-container">
              <span>Ribatis - MUAT</span>
              <div class="project-description-text">
                <p>
                  My first professional experience as a developer was at Ribatis in Casablanca, where I undertook the challenge of developing a web application for the Moroccan Ministry of Urbanism as a full-stack developer. I was responsible for the entire development of the application, which includes both a public side and an admin side.
                </p>
                <ul>
                  <li><p>Public Side: This section is accessible to everyone and includes the following features:</p>
                    <ul>
                      <li><p>News: Displaying the latest news and updates from the ministry.</p></li>
                      <li><p>Agenda: Showcasing upcoming events and important dates.</p></li>
                      <li><p>Ministry Actors: Information about key personnel and their roles.</p></li>
                      <li><p>Job Opportunities: Listing available positions within the ministry.</p></li>
                      <li><p>Complaint Service: A system for submitting complaints.</p></li>
                      <li><p>Contact Form: A form to contact ministry officials directly.</p></li>
                    </ul>
                  </li>
                  <li><p>Admin Side: This section is for internal use by ministry staff and includes the following features:</p>
                    <ul>
                      <li><p>News Management: Publishing and managing news articles about the ministry.</p></li>
                      <li><p>Job Management: Posting and managing job opportunities.</p></li>
                      <li><p>Actor Management: Managing information about key personnel.</p></li>
                      <li><p>Message and Complaint Management: Viewing messages and complaints.</p></li>
                      <li><p>Partner Management: Managing information and relationships with partners.</p></li>
                    </ul>
                  </li>
                </ul>
                <p>
                  This project was a significant milestone in my career, showcasing my ability to handle full-stack development responsibilities and deliver a comprehensive web application tailored to the needs of a governmental institution.
                </p>
              </div>
            </div>          
            `,
						"fr":
            `
            <div class="demo-place-holder">
              <video width="100%" controls id="video-controller">
                <source src="demos/muat-demo-en.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="project-description-text-container">
              <span>Ribatis - MUAT</span>
              <div class="project-description-text">
                <p>
                  Ma première expérience professionnelle en tant que développeur a été chez Ribatis à Casablanca, où j'ai relevé le défi de développer une application web pour le Ministère Marocain de l'Urbanisme en tant que développeur full-stack. J'étais responsable de l'ensemble du développement de l'application, qui comprend une partie publique et une partie admin.
                </p>
                <ul>
                  <li><p>Partie Publique : Cette section est accessible à tous et comprend les fonctionnalités suivantes :</p>
                    <ul>
                      <li><p>Actualités : Affichage des dernières nouvelles et mises à jour du ministère.</p></li>
                      <li><p>Agenda : Présentation des événements à venir et des dates importantes.</p></li>
                      <li><p>Les Acteurs du Ministère : Informations sur le personnel clé et leurs rôles.</p></li>
                      <li><p>Offres d'Emploi : Liste des postes disponibles au sein du ministère.</p></li>
                      <li><p>Service de Réclamation : Un système pour soumettre des réclamations.</p></li>
                      <li><p>Formulaire de Contact : Un formulaire pour contacter directement les responsables du ministère.</p></li>
                    </ul>
                  </li>
                  <li><p>Partie Admin : Cette section est réservée à l'utilisation interne par le personnel du ministère et comprend les fonctionnalités suivantes :</p>
                    <ul>
                      <li><p>Gestion des Actualités : Publication et gestion des articles de presse concernant le ministère.</p></li>
                      <li><p>Gestion des Offres d'Emploi : Publication et gestion des opportunités d'emploi.</p></li>
                      <li><p>Gestion des Acteurs : Gestion des informations sur le personnel clé.</p></li>
                      <li><p>Gestion des Messages et des Réclamations : Consultation des messages et les réclamations.</p></li>
                      <li><p>Gestion des Partenaires : Gestion des informations et des relations avec les partenaires.</p></li>
                    </ul>
                  </li>
                </ul>
                <p>
                  Ce projet a été une étape importante dans ma carrière, mettant en avant ma capacité à assumer des responsabilités de développement full-stack et à livrer une application web complète adaptée aux besoins d'une institution gouvernementale.
                </p>
              </div>
            </div>            
            `
					},
          "display_in_column":true,
				}
			]
		}
	},
	"slide_four": {
		"placeholders": {
			"en": ["Enter your name", "Enter your email", "Enter your phone", "Enter your website", "write your message"],
			"fr": ["Entrez votre nom", "Entrez votre email", "Entrez votre téléphone", "Entrez votre site web", "écrivez votre message"]
		}
	},
	"slide_titles": [
		{
			"normal": { "en": "About", "fr": "À propos" },
			"golden": { "en": "Me", "fr": "de moi" },
			"sub_title": { "en": "To better know me!", "fr": "Pour mieux me connaître!" }
		},
		{
			"normal": { "en": "My", "fr": "Mes" },
			"golden": { "en": "Projects", "fr": "Projets" },
			"sub_title": { "en": "Let's share the best!", "fr": "Partageons le meilleur!" }
		},
		{
			"normal": { "en": "Contact", "fr": "Contacter" },
			"golden": { "en": "Me", "fr": "Moi" },
			"sub_title": { "en": "To get in touch!", "fr": "Pour rester en contact!" }
		}
	],
	"small_titles": [
		{ "en": "Intro", "fr": "Introduction" },
		{ "en": "Personality", "fr": "Personnalité" },
		{ "en": "My Academic Journey", "fr": "Mon Parcours Académique" },
		{ "en": "My Skills", "fr": "Mes Compétences" }
	],
	"project_durations": {
		"en": ["6 months","In just three weeks!", "4 months", "3 months", "5 months", "In 2 months!"],
		"fr": ["6 mois","En trois semaines!", "4 mois", "3 mois", "5 mois", "En 2 mois!"]
	},
	"actions": {
		"en": ["Download CV", "Contact Me", "Send ➤", "see details"],
		"fr": ["Télécharger le CV", "Contactez-moi", "Envoyer ➤", "voir les détails"]
	},
  "contact_form_notif":[
    {
      "en": ["Please insert at least your email and your message"],
      "fr": ["Veuillez insérer au moins votre email et votre message"]
    },
    {
      "en": ["Thank you!", "Message sent successfully"],
      "fr": ["Merci!", "Message envoyé avec succès"]
    },
    {
      "en": ["Please try again!", "Something went wrong"],
      "fr": ["Veuillez réessayer!", "Quelque chose a mal tourné"]
    }
  ],
  "cv_path":{
    "en":"cv-en.pdf",
    "fr":"cv-fr.pdf"
  }
};

translate('en');
translate('fr');


document.addEventListener('DOMContentLoaded', function() {
    hideContainer('loading-screen');
    setRotationGradianAngle();
});

window.addEventListener('resize', function() {
  setRotationGradianAngle();
});


import $ from 'jquery'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// check if the device have touch-screen
function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
        ( navigator.maxTouchPoints > 0 ) || 
        ( navigator.msMaxTouchPoints > 0 );
} 

// set a css classes if the device is touchable
if(is_touch_enabled()) {
    $(".projects").addClass('is-touch')
    $(".projects-cont").addClass('is-touch')
}

$('.nav-ham').click(function() {
    $('.nav-ham > div').toggleClass("open")
    $('.nav-bar').toggleClass('show')
})
$('.par2').slideUp(0)

$('#more-btn').click(function() {
    $('.par2').slideToggle(500)
    if($('#more-btn').text() === "Read More") {
        $('#more-btn').text("Read Less")
    } else {
        $('#more-btn').text("Read More")
    }
})

//animated paragraphes
gsap.utils.toArray('p').forEach(para => {
    const paraAnim = gsap.from(para, {
        opacity:0,
        x:'20px'
    }).delay(0.1)

    ScrollTrigger.create({
        animation: paraAnim,
        trigger: para,
        toggleActions: "restart none none reverse",
        start: 'bottom bottom',
        end: 'top top'

    })
})

// animate project section
let sections = gsap.utils.toArray('.projects-item')

// animate project section based to screeb type
if(!is_touch_enabled()) {
    gsap.to(sections, {
        xPercent: - 100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".projects",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => {
                document.querySelector('.projects').offsetWidth
            }
        }
    })
}

// Define selector for selecting
// anchor links with the hash
let anchorSelector = 'a[href^="#"]';

$(anchorSelector).on('click', function (e) {
    
    e.preventDefault();

    let destination = $(this.hash);

    let scrollPosition = destination.offset().top - 25;

    let animationDuration = 500;

    $('html, body').animate({
        scrollTop: scrollPosition
    }, animationDuration);
});

// email form

const sendFeedback = (emailjs, serviceID, templateId, variables, userId) => {
    emailjs.send(
        serviceID, templateId,
        variables, userId
    ).then(res => {
        console.log('Email successfully sent!')
    })
        .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
}

$("#form-contact").submit((e) => {
    e.preventDefault()

    const name = e.target[0].value
    const email = e.target[1].value
    const message = e.target[2].value

    alert(`Thank you for your message from ${email}`);
    const templateId = 'my_email_template';
    const serviceID = 'my_gmail';
    const userId = "user_5nTxtNAdZq42NuLR5cyjP"
    const data = { from_name: name, message, from_email: email, to_name: 'youssouf' }
    import('emailjs-com').then(emailjs => sendFeedback(emailjs, serviceID, templateId, data, userId))
    
})
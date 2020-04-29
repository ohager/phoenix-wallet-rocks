require('../css/main.css');


//   <script src="js/bootstrap.min.js"></script>
//   <script src="js/fontawesome.min.js"></script>
//   <script src="js/modernizr.custom.js"></script>
//   <script src="js/jquery.easing.js"></script>
//   <script src="js/retina.js"></script>
//   <script src="js/jquery.appear.js"></script>
//   <script src="js/jquery.scrollto.js"></script>
//   <script src="js/slick.min.js"></script>
//   <script src="js/owl.carousel.min.js"></script>
//   <script src="js/jquery.magnific-popup.min.js"></script>
//   <script src="js/wow.js"></script>

const wow = require('./wow')

window.$ = require('./jquery-3.3.1.min');

(() => {
  new wow().init();
})()

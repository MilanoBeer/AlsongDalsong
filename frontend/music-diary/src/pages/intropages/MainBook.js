import '../../css/intropages/MainBook.css'

const MainBook = () => {
    var winWidth = $(window).width();
var ratio = winWidth / 1920;
var fontSize = {
  small: 12,
  medium: 14
};
var played = [0, 0, 0];
var vara = [];
var bodyFontSize = Math.max(16 * ratio, 10);
var posX = Math.max(80 * ratio, 30);
$("body").css("font-size", bodyFontSize + "px");
fontSize.small = Math.max(fontSize.small * ratio, 7);
fontSize.medium = Math.max(fontSize.medium * ratio, 10);
vara[0] = new Vara(
  "#vara-container",
  "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  [
    {
      text: "15 Jan 2019",
      textAlign: "right",
      y: 20,
      x: -30,
      delay: 500,
      duration: 1500,
      fontSize: fontSize.small
    },
    {
      text: "Start the year with something cool.",
      y: 40,
      x: posX,
      duration: 4000
    },
    {
      text: "Like with a library,",
      id: "sphinx",
      x: posX,
      delay: 1000,
      duration: 4500
    },
    {
      text: "..... that can animate text writing",
      id: "end",
      color: "#3f51b5",
      delay: 1000,
      x: posX,
      duration: 4500
    }
  ],
  {
    strokeWidth: 2,
    fontSize: fontSize.medium,
    autoAnimation: false
  }
);
vara[1] = new Vara(
  "#vara-container2",
  "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  [
    {
      text: "16 Jan 2019",
      textAlign: "right",
      delay: 500,
      y: 20,
      x: -30,
      duration: 1500,
      fontSize: fontSize.small
    },
    {
      text: "Try to create something else.",
      y: 40,
      x: posX,
      duration: 4000
    },
    {
      text: "Like a diary or a todo list.",
      y: 40,
      x: posX,
      duration: 3500
    }
  ],
  {
    strokeWidth: 2,
    fontSize: fontSize.medium,
    autoAnimation: false
  }
);
vara[2] = new Vara(
  "#vara-container3",
  "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  [
    {
      text: "17 Jan 2019",
      textAlign: "right",
      delay: 500,
      y: 20,
      x: -30,
      duration: 1500,
      fontSize: fontSize.small
    },
    {
      text: "Creating a Diary.",
      y: 40,
      x: posX,
      duration: 4000
    },
    {
      text: "View the library on,",
      y: 20,
      x: posX,
      duration: 3500
    },
    {
      text: "Github.",
      y: 10,
      color: "#3f51b5",
      id: "link",
      x: posX,
      duration: 1500
    }
  ],
  {
    strokeWidth: 2,
    fontSize: fontSize.medium,
    autoAnimation: false
  }
);
vara[2].ready(function() {
  $(".front:not(.last)").click(function() {
    var ix = $(this)
      .parent(".paper")
      .index();
    $(".book").addClass("open");
    $(this)
      .parent(".paper")
      .addClass("open");
    if (!played[ix]) {
      vara[ix].playAll();
      vara[ix].animationEnd(function(i, o) {
        played[ix] = 1;
        if (i == "link") {
          var group = o.container;
          var rect = vara[2].createNode("rect", {
            x: 0,
            y: 0,
            width: o.container.getBoundingClientRect().width,
            height: o.container.getBoundingClientRect().height,
            fill: "transparent"
          });
          group.appendChild(rect);
          $(rect).css("cursor", "pointer");
          $(rect).click(function() {
            console.log(true);
            document.querySelector("#link").click();
          });
        }
      });
    }
  });
  $(".back").click(function() {
    if (
      $(this)
        .parent(".paper")
        .index() == 0
    )
      $(".book").removeClass("open");
    $(this)
      .parent(".paper")
      .removeClass("open");
  });
});


    return (<>
    <div class="v-center"></div>
<div id="container">
  <div class="book">
    <div class="first paper">
      <div class="page front contents">
        <div class="intro">
          <h2>DIARY</h2>
          <h1>2019</h1>
        </div>
      </div>
      <div class="page back"></div>
    </div>
    <div class="second paper">
      <div class="page front contents">
        <div id="vara-container"></div>
      </div>
      <div class="page back"></div>
    </div>
    <div class="third paper">
      <div class="page front contents">
        <div id="vara-container2"></div>
      </div>
      <div class="page back"></div>
    </div>
    <div class="fourth paper">
      <div class="page last front contents">
        <div id="vara-container3"></div>
      </div>
      <div class="page back"></div>
    </div>
    <div class="side"></div>
    <div class="bottom"></div>
    <div class="shadow"></div>
  </div>
</div>
<a id="link" href="https://github.com/akzhy/Vara" target="_blank">VIEW ON GITHUB</a>

    </>)
}

export default MainBook
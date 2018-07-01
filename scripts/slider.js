
    var arrowRight;
    var arrowLeft;
    var slideImg;
    var leftValue;
    var railWidth;
    var imageNumber;
    var imageWidth;
    var liContainer;
    var liItems;
    var ulBullets;
    var bullets;



    arrowRight = document.getElementById("arrowRightIcon");
    arrowLeft = document.getElementById("arrowLeftIcon");

    


    slideImg = document.getElementById("sliderImages");
    liItems = slideImg.children;
    imageNumber = liItems.length;

    ulBullets = document.getElementById("sliderBullets");



///--------=== slide function ===---------///   
///          -to sliding image-           ///
///---------------------------------------///   
    function slide(direction) {
    
        if (direction == "right") {

            setTimeout(() => {

                liItems[0].firstChild.style.width = "0px";
                liItems[0].firstChild.style.marginRight = "0px";
            }, 10);

            slideImg.insertBefore(liItems[0],liItems[imageNumber]);

            liItems[imageNumber-1].firstChild.style.width = "150px";
            liItems[imageNumber-1].firstChild.style.marginRight = "10px";
            bulletsMove(direction);
            
        } else {

            liItems[imageNumber-1].firstChild.style.width = "0px";
            liItems[imageNumber-1].firstChild.style.marginRight = "0px";

            slideImg.insertBefore(liItems[imageNumber-1],liItems[0]);

            setTimeout(() => {
                liItems[0].firstChild.style.width = "150px";
                liItems[0].firstChild.style.marginRight = "10px";
            }, 50);



            bulletsMove(direction);
            
        }

    }



///--------=== createBullets function ===-------///
///          -to create bullets-          ///
///---------------------------------------///     
    function createBullets() {
        var width = slideImg.style.width;

        var liBullet = '<li><i class="fas fa-circle slider-bullet"></i></li>';
        var liBullet2 = '<li><i class="fas fa-circle slider-bullet slider-bullet-active"></i></li>';
        railWidth = document.getElementById("slider-rail").offsetWidth;
        ulBullets.innerHTML = "";

        // for (let i = 0; i <= (Math.ceil((parseInt(width)/imageWidth)) - Math.floor((railWidth/160))); i++) {
        //     if (i == 0) {
        //         ulBullets.innerHTML = ulBullets.innerHTML + liBullet2;
        //     } else {
        //         ulBullets.innerHTML = ulBullets.innerHTML + liBullet;
        //     }
            
        // }

        for (let i = 0; i <= imageNumber-1 ; i++) {
            if (i == 0) {
                ulBullets.innerHTML = ulBullets.innerHTML + liBullet2;
            } else {
                ulBullets.innerHTML = ulBullets.innerHTML + liBullet;
            }
            
        }
        //bullets = ulBullets.children;
    }



///------=== bulletsMove function ===-----///
///     -to move bullets after sliding-   ///
///---------------------------------------/// 
    function bulletsMove(direction) {
        var len =  ulBullets.children.length;
        var children = ulBullets.children;
        //alert(len);

        if (direction === "right") {
            ulBullets.insertBefore(children[len-1],children[0]);
            //alert(direction);
        } else {
            ulBullets.insertBefore(children[0], children[len]);

            //alert(direction);
        }
    }
    



///------=== bulletClick function ===-----///
/// -to move slider after click on bullet-///
///---------------------------------------/// 

function bulletClick(e) {
    //alert(e.target.id);  // Check if the element is a LI
    //document.getElementById('id').classList.add('class');
    //document.getElementById('id').classList.remove('class');
    var flagActive;
    var flagClick;
    if (e.target.tagName === 'I'){
        if (e.target.className != "fas fa-circle slider-bullet slider-bullet-active") {
            e.target.className = "fas fa-circle slider-bullet slider-bullet-clicked";
        }
        for (let i = 0; i < ulBullets.children.length; i++) {

            //alert(ulBullets.children[i].firstChild.className);
            if (ulBullets.children[i].firstChild.className == "fas fa-circle slider-bullet slider-bullet-active") {
                flagActive = i;
            } else if (ulBullets.children[i].firstChild.className == "fas fa-circle slider-bullet slider-bullet-clicked"){

                flagClick = i;
            }
        }
        //alert(flagActive+"  "+flagClick);


        if (flagActive - flagClick > 0) {
            for (let i = 0; i < flagActive - flagClick; i++) {
                setTimeout(slide("left"), 500);
                //await interval;
                //addAndRemoveBulletClass(flagClick);
            }
        } else if (flagActive - flagClick < 0) {
            for (let i = 0; i < Math.abs(flagActive - flagClick); i++) {
                setTimeout(slide("right"), 500);
                //await interval;

            }
            
        }
        
        addAndRemoveBulletClass(flagClick);
        
    }
}
function addAndRemoveBulletClass(clickedBullet) {
    for (let i = 0; i < ulBullets.children.length; i++) {
        if (ulBullets.children[i].firstChild.className != "fas fa-circle slider-bullet slider-bullet-active") {
            ulBullets.children[i].firstChild.className = "fas fa-circle slider-bullet slider-bullet";
        }
        //alert(liItems[i].firstChild.outerHTML);
        liItems[i].firstChild.style.width = "150px";
        liItems[i].firstChild.style.marginRight = "10px";


        
    }
}


///------=== sortSlides function ===------///
///     -to sort images on page load-     ///
///---------------------------------------///
    function sortSlides() {

        var slideImg = document.getElementById("sliderImages");
        var children = slideImg.children;
        var len = children.length;
        slideImg.insertBefore(children[len-1],children[0]);


    }



///----=== sliderMouseMove function ===---///
///          -to sliding by drag-         ///
///---------------------------------------///
    function sliderMouseMove() {
        var x1, x2, isClicked = false, isScrolled = false;
        var sliderRail = document.getElementById("slider-rail");

        sliderRail.addEventListener('mousedown', function(e){
            x1 = e.pageX;
            isClicked= true;
            //alert(x1);
            

        }, false);

        sliderRail.addEventListener('mouseup', function(e){
            isClicked= false;
            isScrolled = false;
        }, false);

        sliderRail.addEventListener('mouseleave', function(e){
            isClicked= false;
            isScrolled = false;
        }, false);


        sliderRail.addEventListener('mousemove', function(e){
            x2 = e.pageX;
            if (isClicked) {
            //alert(x2-x1);

            if (isScrolled == false) {
                if (x2-x1 < -20) {
                    slide("right");
                    x1 = e.pageX;
                    isScrolled = true;
                    setTimeout(() => {
                        isScrolled = false;
                    }, 400);
                } else if (x2-x1 > 20) {
                    slide("left");
                    x1 = e.pageX;
                    isScrolled = true;
                    setTimeout(() => {
                        isScrolled = false;
                    }, 400);
                }
            }
            

            //document.getElementById("span").innerText = x2-x1;
            }
        }, false);
    }



    arrowRight.onclick = function () {
        slide("right");
    }
    arrowLeft.onclick = function () {
        slide("left");
    } 
    
    sortSlides();
    createBullets();

    ulBullets.addEventListener('click', bulletClick);

    sliderMouseMove();
    
    

    // function resize() {
    //     slideImg.style.width = parseInt(imageWidth * imageNumber) + "px";
    //     bullets();
    //   }
    
      //window.onresize = resize;

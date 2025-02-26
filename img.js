document.getElementById("btn_init").remove();
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  console.log(document.readyState);
  //init();
  if (typeof imgs !== 'undefined') {
	
	let imageSources = imgs.split("#%#");
		  let loadedImages = 0;
	  	  let erroredImages = 0;
	
		  imageSources.forEach(item => {
			  let src = item.split("%#%");
			    const img = new Image();
			    img.onload = () => {
				        loadedImages++;
				    	document.body.appendChild(img);
				        console.log(`${src[0]} loaded`);
				        if (loadedImages === imageSources.length) {
						      console.log('All images loaded');
					}
			    };
			    img.onerror = () => {
				        console.error(`Error loading ${src[0]}`);
				        loadedImages++;
				        erroredImages++;
				        if (loadedImages === imageSources.length) {
						       console.log('All images loaded or errored');
					}
			    }
			    img.src = src[0];
			    img.alt = src[1];
			    img.addEventListener('click', function() {rescale(this);});  
  }
});

function init(){
	document.getElementById("btn_init").remove();
	if (document.readyState == "complete"){
		$$("img").forEach(img => {
			if (!img.naturalWidth && !img.naturalHeight) {
				//img.parentNode.removeChild(img);
				img.parentNode.setAttribute("style","display: none");
			}
		});
	  	resizeAll();
	}
	else{
		window.addEventListener("load", (event) => {
		  console.log("page is fully loaded");
		  init();
		});
	}
}

function fit_to_screen(i){
	i.removeAttribute("style");
	//i.setAttribute("rescaled","true");
	let winX = window.innerWidth;
	let winY = window.innerHeight;
	//let vbar = false;
	//i.dataset.limX = false;
	//i.dataset.limY = false;
	i.dataset.scaleLevel = 0;
	i.dataset.diffX = i.naturalWidth - winX;
	i.dataset.diffY = i.naturalHeight - winY;
	if (i.dataset.diffX > 0)
	{
		i.style.maxWidth = winX + "px";
		//i.dataset.limX = true;
		i.dataset.scaleLevel++;
	}
	if (i.dataset.diffY > 0)
	{
		i.style.maxHeight = winY + "px";
		//i.dataset.limY = true;
		i.dataset.scaleLevel++;
	}
	i.dataset.lim1 = (i.dataset.diffX > i.dataset.diffY)? "X" : "Y";
	/*if (document.body.scrollHeight > document.body.clientHeight) // vertical scrollbar
	{
			i.style.maxHeight = winY;
			vbar = true;
	}
	if (document.body.scrollWidth > document.body.clientWidth) // horizontal scrollbar
	{
			if (vbar) // both scrollbars
			{
					if ((document.body.scrollHeight - document.body.clientHeight) > (document.body.scrollWidth - document.body.clientWidth)) // let's see which one is bigger
					{
							i.removeAttribute("style");
							i.style.maxHeight = winY;
					}
					else
					{
							i.removeAttribute("style");
							i.style.maxWidth = winX;
					}
			}
			else
			{
					i.removeAttribute("style");
					i.style.maxWidth = winX;
			}
	}*/
}

function resizeAll(){
	$$("img").forEach(img => {
		fit_to_screen(img);
	});
}
	  
function rescale(i){
	switch(i.dataset.scaleLevel) {
		case "0":
			fit_to_screen(i);
		break;
		case "1":
			i.removeAttribute("style");
			//i.dataset.limX = false;
			//i.dataset.limY = false;
			i.dataset.scaleLevel = 0;
		break;
		case "2":
			switch(i.dataset.lim1) {
				case "X":
					i.style.maxWidth = '';
					//i.dataset.limX = false;
				break;
				case "Y":
					i.style.maxHeight = '';
					//i.dataset.limY = false;
				break;
				default:
					
			}
			i.dataset.scaleLevel = 1;
		break;
		default:
			// code block
	}
}

function $$(selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}

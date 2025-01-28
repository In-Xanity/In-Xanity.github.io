window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  resizeAll();
});

function fit_to_screen(i){
	i.removeAttribute("style");
	i.setAttribute("rescaled","true");
	var winX = window.innerWidth + "px";
	var winY = window.innerHeight + "px";
	var vbar = false;
	if (document.body.scrollHeight > document.body.clientHeight) // vertical scrollbar
	{
			i.style.height = winY;
			vbar = true;
	}
	if (document.body.scrollWidth > document.body.clientWidth) // horizontal scrollbar
	{
			if (vbar) // both scrollbars
			{
					if ((document.body.scrollHeight - document.body.clientHeight) > (document.body.scrollWidth - document.body.clientWidth)) // let's see which one is bigger
					{
							i.removeAttribute("style");
							i.style.height = winY;
					}
					else
					{
							i.removeAttribute("style");
							i.style.width = winX;
					}
			}
			else
			{
					i.removeAttribute("style");
					i.style.width = winX;
			}
	}
}

function resizeAll(){
	$$("img").forEach(img => {
		fit_to_screen(img);
	});
}
	  
function rescale(i){
	if (i.hasAttribute("rescaled"))
	{
		i.removeAttribute("rescaled");
		i.removeAttribute("style");
		console.log("large");
	}
	else
	{
		i.setAttribute("rescaled","true");
		fit_to_screen(i);
		console.log("small");
	}
}


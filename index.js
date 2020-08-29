let iframe = document.querySelector('iframe')
let btn = document.querySelector('button')
let input = document.querySelector('.input')
let title = document.querySelector('.title')
let select = document.querySelector('select')
let str = 'GvesyESp9UE'
var i = parseInt(localStorage.getItem('index'))
let description = document.querySelector('.description')
let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id='
let key = 'AIzaSyAaqIu-YfpzkemjZdaTfDv8NmQr1TbMV58'
btn.addEventListener('click', embded);

if (!isNaN(i)) {
    for (let s = 0; s <= parseInt(localStorage.getItem('index')); s++) {
        var option = document.createElement('option')
        option.textContent = localStorage.getItem('title'+s)
        option.value = localStorage.getItem('id'+s)
        select.appendChild(option)
    }
}

async function getYTData(str) {
	let res = await fetch(`${url}${str}&key=${key}`)
	let data = await res.json()
	.then((data) => {
    	//title.textContent = data.items[0].snippet.title
    	description.textContent = data.items[0].snippet.description
    	document.title = 'YTB - '+data.items[0].snippet.title
    	iframe.src = `https://www.youtube.com/embed/${str}`
        i = parseInt(localStorage.getItem('index')) + 1
        if (isNaN(i)) i = 0
        if (!Object.values(localStorage).includes(str)) {
            localStorage.setItem('id' + i, str)
            localStorage.setItem('title' + i, data.items[0].snippet.title)
            localStorage.setItem('index', i)
            var option = document.createElement('option')
            option.textContent = data.items[0].snippet.title
            option.value = str
            select.appendChild(option)
        }
    })
}

select.addEventListener('change',function() {
    getYTData(select.value)
    input.value = `https://www.youtube.com/watch?v=${select.value}`
})

getYTData(str)

async function embded() {
    let str
    if (input.value.includes('youtube.com') || input.value.includes('youtu.be')) {
        if (input.value.length && input.value.indexOf('=') !== -1)
            str = input.value.slice(input.value.indexOf('=') + 1, input.value.indexOf('=') + 12)
        else if (input.value.length)
            str = input.value.slice(input.value.lastIndexOf('/') + 1, input.value.lastIndexOf('/') + 12)
    }
    else {
    	if (!input.value)
    		alert('EMPTY')
    	else
    		alert('This is not a Youtube link !')
    	return
    }
    getYTData(str)
}
let interviewCount =[];
let rejectedCount =[];
let currentStatus = 'all';

let total =document.getElementById("total-count");
let interview =document.getElementById("interview-count");
let rejected =document.getElementById("rejected-count");


const all = document.getElementsByClassName('all-btn')
const reject = document.getElementsByClassName('rejected-btn')
const inter = document.getElementsByClassName('interview-btn')


const allApplications = document.getElementById('JobSelects')
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filter-section');



function calculation(){
    total.innerText = allApplications.children.length;
    interview.innerText = interviewCount.length;
    rejected.innerText = rejectedCount.length;
}
calculation()



function toggleStyle(className) {
    const buttons = document.querySelectorAll('.all-btn, .interview-btn, .rejected-btn');
    buttons.forEach(button => {
        button.classList.remove('bg-blue-500', 'text-white');
        button.classList.add('bg-gray-300', 'text-black');
    });
    const activeButton = document.querySelector(`.${className}`);
    if (activeButton) {
        activeButton.classList.remove('bg-gray-300', 'text-black');
        activeButton.classList.add('bg-blue-500', 'text-white');}

    if (Id == 'interview-btn') {
        allApplications.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } 
    else if (Id == 'all-btn') {
        allApplications.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (Id == 'rejected-btn') {
        allApplications.classList.add('hidden');
        filterSection.classList.remove('hidden')
            renderRejected()
    }
}




mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('inter-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const title = parenNode.querySelector('.title').innerText
        const about = parenNode.querySelector('.about').innerText
        const time = parenNode.querySelector('.time').innerText
        const status = parenNode.querySelector('.status').innerText
        const descriptions = parenNode.querySelector('.descriptions').innerText

        parenNode.querySelector('.status').innerText = 'Interview'

        const cardInfo = {
            title,
            about,
            time,
            status: 'interview',
            descriptions
        }


        const exist = interviewCount.find(item => item.title == cardInfo.title)
        parenNode.querySelector('.status').innerText='applied'

        if (!exist) {
            interviewCount.push(cardInfo)
        }
            interviewCount = interviewCount.filter(item => item.title != cardInfo.title)

        // after remove rerender the html
        if (currentStatus == 'rejected-btn') {
            renderRejected()
        }

        calculation()

         


    }else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

       const title = parenNode.querySelector('.title').innerText
        const about = parenNode.querySelector('.about').innerText
        const time = parenNode.querySelector('.time').innerText
        const status = parenNode.querySelector('.status').innerText
        const descriptions = parenNode.querySelector('.descriptions').innerText

        parenNode.querySelector('.status').innerText = 'Rejected'

        const cardInfo = {
            title,
            about,
            time,
            status: 'Rejected',
            descriptions
        }


        const exist = rejectedCount.find(item => item.title == cardInfo.title)

        if (!title) {
            rejectedCount.push(cardInfo)
        }

        // removing the plant from thriving list
        rejectedCount = rejectedCount.filter(item => item.title!= cardInfo.title)

        // console.log(thrivingList);

        // after remove rerender the html
        if (currentStatus == "interview-btn") {
            renderInterview();
        }
        calculation()

    }

})











function renderInterview(){
    filterSection.innerHTML = '';
    for(let interview of interviewCount){
        console.log(interview);
        let div = document.createElement('div');
        div.className = 'flex justify-between bg-[#ffffff] p-[25px] rounded-md';
        div.innerHTML = `
        <div class="space-y-[8px] ">
                        <div>
                        <h2 class=" title text-2xl font-bold">Mobile First Corp</h2>
                        <p class=" about text-[20px] font-medium text-[#858585]">React Native Developer</p>
                        <p class=" time text-[18px] font-normal">Remote • Full-time • $130,000 - $175,000</p>
                        <button class=" status bg-[#e2ecff] text-[18px] font-medium text-[#5185ff] px-4 py-2 rounded-lg ">NOT APPLIED</button>
                       <p class=" descriptions text-[18px] font-normal">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                       </div>

                        <div class="flex pt-[10px]">
                            <button class="inter-btn text-[#32b30f] border-[2px] border-[#23f54d] px-4 py-2 rounded-lg mr-2 font-medium">INTERVIEW</button>
                            <button class=" reject-btn  text-[#bf0d0d] border-[2px] border-[#f55637] px-4 py-2 rounded-lg font-medium">REJECTED</button>
                        </div>

                    </div>
                    <div >
                        <img src="./img/Trash.png" alt="">
                   </div>
        `           
      filterSection.appendChild(div) 
    } 
     
}      


function renderRejected(){
    filterSection.innerHTML = '';
    for(let reject of rejectedCount){
        console.log(reject);
        let div = document.createElement('div');
        div.className = 'flex justify-between bg-[#ffffff] p-[25px] rounded-md';
        div.innerHTML = `
        <div class="space-y-[8px] ">
                        <div>
                        <h2 class=" title text-2xl font-bold">Mobile First Corp</h2>
                        <p class=" about text-[20px] font-medium text-[#858585]">React Native Developer</p>
                        <p class=" time text-[18px] font-normal">Remote • Full-time • $130,000 - $175,000</p>
                        <button class=" status bg-[#e2ecff] text-[18px] font-medium text-[#5185ff] px-4 py-2 rounded-lg ">NOT APPLIED</button>
                       <p class=" descriptions text-[18px] font-normal">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                       </div>

                        <div class="flex pt-[10px]">
                            <button class="inter-btn text-[#32b30f] border-[2px] border-[#23f54d] px-4 py-2 rounded-lg mr-2 font-medium">INTERVIEW</button>
                            <button class=" reject-btn  text-[#bf0d0d] border-[2px] border-[#f55637] px-4 py-2 rounded-lg font-medium">REJECTED</button>
                        </div>

                    </div>
                    <div >
                        <img src="./img/Trash.png" alt="">
                   </div>
        `           
      filterSection.appendChild(div) 
    } 
     
}
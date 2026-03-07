const loadData = async () => {
    loading(true);
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues#");
    const data = await res.json();
    loadCard(data.data);
}

const loadCard = (datalist) => {
    cardContainer.innerHTML = "";
    datalist.forEach((data) => {
        if (currentActiveBtn === "closed") {
            if (data.status === "closed") {
                cardContainer.innerHTML += cardCheck(data);
            }
        }
        else if (currentActiveBtn === "open") {
            if (data.status === "open") {
                cardContainer.innerHTML += cardCheck(data);
            }
        }
        else {
            cardContainer.innerHTML += cardCheck(data);
        }
    });
    openModal();
    totalCardNumber();
    loading(false);
}

function totalCardNumber() {
    totalCard.innerHTML = cardContainer.children.length;
}

function tabSwitch() {
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            searchBox.value = "";
            btns.forEach((btn) => {
                btn.classList.remove(...activeClass);
                btn.classList.add(...defaultClass);
            });
            btn.classList.add(...activeClass);
            btn.classList.remove(...defaultClass);
            currentActiveBtn = btn.id;
            cardContainer.innerHTML = "";
            loadData();
        })
    })
}

function labelCheck(label) {
    if (label === 'bug') {
        return "border-secondary/30 btn-secondary";
    }
    else if (label === 'help wanted') {
        return "border-warning/30 btn-warning";
    }
    else if (label === 'enhancement' || label === 'good first issue') {
        return "border-success/30 btn-success";
    }
    else {
        return "text-[#9CA3AF] border-[#dfdfdf] bg-[#f0f0f096]"
    }
}

function labelIcon(name) {
    if (name === "bug") {
        return `<i class="ri-bug-line"></i>`;
    }
    else if (name === "help wanted") {
        return `<i class="ri-lifebuoy-line"></i>`;
    }
    else if (name === 'enhancement' || name === 'good first issue') {
        return `<i class="ri-color-filter-ai-line"></i>`;
    }
    else {
        return `<i class="ri-file-2-line"></i>`;
    }
}

function labelAdd(btn_arr) {
    const label = [];
    btn_arr.forEach((btn) => {
        label.push(`<button class="btn btn-soft border ${labelCheck(btn)} px-2 py-0 rounded-full max-h-7 uppercase">${labelIcon(btn)} ${btn}</button>`);
    });
    return label;
}

function cardCheck(data) {
    const open = ['border-t-[#00A96E]', 'shadow-[#d0ffee]', 'border-[#d0ffee]'];
    const close = ['border-t-[#A855F7]', 'shadow-[#f1e3ff]', 'border-[#f1e3ff]'];
    const defaultBorder = ['border-t-[#9CA3AF]', 'shadow-[#f1e3ff]', 'border-[#f1e3ff]']

    const card = `<div data-id="${data.id}"
                    class="card cursor-pointer space-y-5 pb-3 shadow-sm border border-t-4 ${data.status === "open" ? open.join(' ') : data.status === 'closed' ? close.join(" ") : defaultBorder.join(" ")} rounded-lg">
                    <div class="p-4 mb-0 border-b-2 border-gray-200 space-y-3 min-h-[75%]">
                        <div class="flex justify-between items-center">
                            <div class="status-img">
                                <img src=${`./assets/${data.status === "open" ? "Open" : "Closed"}-Status.png`}>
                            </div>
                            <button id="status"
                                class="${data.priority === 'high' ? 'btn btn-soft btn-secondary' : data.priority === 'low' ? 'btn text-[#9CA3AF] btn-disabled' : data.priority === 'medium' ? "btn btn-soft btn-warning" : 'text-[#9CA3AF] btn-disabled'} uppercase px-6 leading-none max-h-7 rounded-full">
                                ${data.priority}
                            </button>
                        </div>

                        <div class="flex flex-col justify-around h-[80%]">
                            <h4 class="font-semibold text-xl">${data.title}</h4>
                            <p class="text-[14px] text-[#64748B]">${data.description}</p>
                            <div class="flex gap-1 flex-wrap">
                                ${labelAdd(data.labels).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="space-y-1.5 p-4">
                        <p class="text-[#64748B] text-[14px]">#1 by ${data.author}</p>
                        <p class="text-[#64748B] text-[14px]">${new Date(data.createdAt).toLocaleString("en-US", dateStyle)}</p>
                    </div>
                </div>`;
                return card;
}

function loading(status) {
    if (status) {
        spinner.classList.remove("hidden");
    }
    else {
        spinner.classList.add("hidden");
    }
}

function openModal() {
    const cards = [...document.getElementsByClassName("card")];
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            card_modal.showModal();
            loadModalData(card.dataset.id);
        });
    });
}

function showModalData(data) {
    const modal = `<h3 class="text-lg font-bold">${data.title}</h3>
                <div class="flex w-full justify-between items-center">
                    <button
                        class="btn btn-active btn-${data.status === "open" ? "success" : "primary"} max-h-6 sm:max-h-full max-w-16 sm:max-w-full text-[12px] sm:text-base capitalize rounded-full text-white font-normal">${data.status === "open" ? "Opened" : "closed"}</button>
                    <span class="h-1 w-1 rounded-full bg-[#515e71]"></span>
                    <p class="text-[#64748B] text-[14px]">${data.assignee || "No one found"}</p>
                    <span class="h-1 w-1 rounded-full bg-[#515e71]"></span>
                    <p class="text-[#64748B] text-[14px]">${new Date(data.createdAt).toLocaleString('en-US', dateStyle)}</p>
                </div>
                <div class="flex gap-1 my-6">
                     ${labelAdd(data.labels).join('')}
                </div>
                <p class="text-[#64748B] text-[14px]">${data.description}</p>
                <div class="flex p-2.5 justify-between bg-[#F8FAFC] rounded-xl">
                    <div class="flex-1 flex flex-col justify-between">
                        <p class="text-[#64748B]">Assignee:</p>
                        <p class="font-semibold">${data.assignee || "No one found"}</p>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#64748B]">Priority:</p>
                        <p class="uppercase px-3.5 py-0.5 bg-[#${data.priority === "high" ? "EF4444" : data.priority === "medium" ? "e5a600" : "515e71"}] text-[13px] text-white rounded-full w-fit">${data.priority}</p>
                    </div>
                </div>`;
    loading(false);
    modalBox.innerHTML = modal;
}

const loadModalData = async (id) => {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    showModalData(data.data);
}

const searchCard = async (searchText) => {
    if (currentActiveBtn !== '') {
        loading(true);
    }
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText.trim()}`);
    const data = await res.json();
    if (currentActiveBtn !== '') {
        const btn = document.getElementById(`${currentActiveBtn}`);
        btn.classList.remove(...activeClass);
        btn.classList.add(...defaultClass);
        currentActiveBtn = '';
    }
    loadCard(data.data);
}
const btns = document.querySelectorAll(".tab button");
const cardContainer = document.querySelector('#card-container');
const spinner = document.querySelector('.loading');
const totalCard = document.querySelector("#total");
const modalBox = document.querySelector(".modal-data");
const searchBtn = document.querySelector("#search-btn");
const searchBox = document.querySelector("#search-input");

let activeClass = ["btn-primary"];
let defaultClass = ["border-[#E4E4E7]", "text-[#64748B]"];
let total = 0;
let currentActiveBtn = 'all';
let dateStyle = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
}

searchBtn.addEventListener("click", () => {
    searchCard(searchBox.value.trim());

})


loadData();
tabSwitch();
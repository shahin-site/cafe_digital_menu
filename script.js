
// =====================================
// منوی دیجیتال کافه
// سازنده: شاهین بخشی
// =====================================

// فهرست محصولات

const menuData = {

    hot: [

        { name: "اسپرسو ۳۰A / ۷۰R", price: "—" },
        { name: "اسپرسو ۱۰۰R", price: "—" },
        { name: "اسپرسو ۱۰۰A", price: "—" },
        { name: "لاته", price: "—" },
        { name: "کاپوچینو", price: "—" },
        { name: "نسکافه", price: "—" },
        { name: "لاته زعفرانی", price: "—" },
        { name: "موکا", price: "—" },
        { name: "کارامل ماکیاتو", price: "—" },
        { name: "آمریکانو", price: "—" },
        { name: "هات چاکلت", price: "—" },
        { name: "چای نبات", price: "—" },
        { name: "شیر داغ", price: "—" },
        { name: "قهوه ترک", price: "—" },
        { name: "کاپوچینو وانیلی", price: "—" },
        { name: "چای ماسالا", price: "—" },
        { name: "چای کرک", price: "—" },
        { name: "اسپرسو رومانو", price: "—" }

    ],

    cold: [

        { name: "آیس لاته", price: "—" },
        { name: "آیس آمریکانو", price: "—" },
        { name: "آیس کارامل ماکیاتو", price: "—" },
        { name: "آیس موکا", price: "—" },
        { name: "موهیتو", price: "—" },
        { name: "شربت بهارنارنج", price: "—" },
        { name: "آفوگاتو", price: "—" },
        { name: "بستنی اسکوپی", price: "—" },
        { name: "شیر موز", price: "—" },
        { name: "شیر موز بستنی", price: "—" },
        { name: "کافه گلاسه", price: "—" },
        { name: "آیس اسپرسو رومانو", price: "—" }

    ]

};


// دریافت عناصر HTML

const hotList = document.getElementById("hotList");

const coldList = document.getElementById("coldList");

const searchInput = document.getElementById("searchInput");

const emptyState = document.getElementById("emptyState");

let activeFilter = "all";


// نمایش محصولات

function renderList(container, items) {

    container.innerHTML = items.map(item => `

        <div class="product-item">

            <span class="product-dot"></span>

            <span class="product-name">
                ${item.name}
            </span>

            <span class="product-price">
                ${item.price === "—"
                    ? "قیمت: استعلام"
                    : item.price}
            </span>

        </div>

    `).join("");

}


// جست‌وجو و فیلتر محصولات

function updateMenu() {

    const query = searchInput.value.trim().toLocaleLowerCase("fa");

    let visibleCount = 0;

    ["hot", "cold"].forEach(category => {

        const panel = document.querySelector(
            `[data-category="${category}"]`
        );

        const shouldShowCategory =
            activeFilter === "all" ||
            activeFilter === category;

        const filtered = menuData[category].filter(item =>

            item.name
                .toLocaleLowerCase("fa")
                .includes(query)

        );

        panel.style.display =
            shouldShowCategory && filtered.length
                ? ""
                : "none";

        if (shouldShowCategory) {
            visibleCount += filtered.length;
        }

        renderList(
            document.getElementById(category + "List"),
            filtered
        );

    });

    emptyState.hidden = visibleCount > 0;

}


// انتخاب دسته‌بندی

document.querySelectorAll(".tab").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".tab").forEach(tab => {
            tab.classList.remove("active");
        });

        button.classList.add("active");

        activeFilter = button.dataset.filter;

        updateMenu();

    });

});


// فعال‌سازی جست‌وجو

searchInput.addEventListener("input", updateMenu);


// اجرای اولیه منو

updateMenu();

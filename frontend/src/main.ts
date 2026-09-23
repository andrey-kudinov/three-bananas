import './style.css'

const ball = `<svg class="ball" viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="61" fill="#fff" stroke="#101828" stroke-width="5"/><path d="M80 47 98 60 91 82H69l-7-22zM69 82 52 95M91 82l17 13M62 60 43 58M98 60l19-2M52 95l7 22M108 95l-7 22" fill="none" stroke="#101828" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const products = [
  { id: 'basic', level: 'Базовые навыки', description: 'Первый шаг к уверенной игре и хорошему настроению.', price: 100 },
  { id: 'advanced', level: 'Продвинутый уровень', description: 'Больше практики, неожиданных ходов и футбольного азарта.', price: 200 },
]

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="topbar"><a class="logo" href="/"><span>3</span> БАНАНА</a><span class="topbar-note">PDF для своих</span></header>
<main>
<section class="hero"><div class="hero-copy"><p class="eyebrow">ФУТБОЛЬНАЯ БИБЛИОТЕКА</p><h1>Игра начинается<br><em>с первого шага.</em></h1><p class="hero-text">Два PDF-файла, чтобы прокачать навыки, добавить уверенности и получать от игры больше.</p><a class="scroll-link" href="#catalog">Смотреть материалы <span>↓</span></a></div><div class="hero-ball">${ball}<span>03</span></div></section>
<section class="catalog" id="catalog"><div class="section-heading"><div><p class="eyebrow">ВЫБЕРИТЕ МАТЕРИАЛ</p><h2>Два уровня.<br><em>Одна большая игра.</em></h2></div><p class="section-note">Можно взять один файл<br>или собрать оба.</p></div><div class="product-grid">${products.map((product, index) => `<label class="product-card ${index ? 'orange' : ''}"><input class="product-check" type="checkbox" value="${product.id}" data-price="${product.price}"><span class="checkmark">✓</span><span class="card-art">${ball}<strong>0${index + 1}</strong></span><span class="card-content"><span class="card-kicker">PDF / УРОВЕНЬ 0${index + 1}</span><strong>Три банана<br>${product.level}</strong><span class="card-description">${product.description}</span><span class="card-footer"><span>Скачать PDF</span><b>${product.price} ₽</b></span></span></label>`).join('')}</div></section>
<section class="checkout" id="checkout"><div><p class="eyebrow">ФИНИШНАЯ ПРЯМАЯ</p><h2>Оставьте email,<br><em>и мы всё оформим.</em></h2></div><form id="order-form"><label for="email">Ваш email</label><input id="email" type="email" placeholder="вы@пример.ru" required><label class="consent"><input id="consent" type="checkbox" required><span>Согласен на обработку персональных данных</span></label><button>Перейти к оплате <span>↗</span></button><p id="message"></p></form><div class="total"><span>Итого</span><strong id="total">0 ₽</strong></div></section>
</main><footer><span>© 2026 Три банана</span><span>Сделано для красивой игры</span></footer><aside class="sticky-bar" aria-live="polite"><div><strong id="sticky-title">Выберите свой материал</strong><span id="sticky-summary">Два PDF на выбор</span></div><button id="sticky-action" type="button">Выбрать PDF <span>↓</span></button></aside>`

const checks = Array.from(document.querySelectorAll<HTMLInputElement>('.product-check'))
const total = document.querySelector<HTMLElement>('#total')!
const stickyTitle = document.querySelector<HTMLElement>('#sticky-title')!
const stickySummary = document.querySelector<HTMLElement>('#sticky-summary')!
const stickyAction = document.querySelector<HTMLButtonElement>('#sticky-action')!
const orderForm = document.querySelector<HTMLFormElement>('#order-form')!
const emailInput = document.querySelector<HTMLInputElement>('#email')!
const scrollTo = (id: string) => document.querySelector<HTMLElement>(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
const updateTotal = () => {
  const selected = checks.filter((check) => check.checked)
  const sum = selected.reduce((result, check) => result + Number(check.dataset.price), 0)
  total.textContent = `${sum} ₽`
  if (selected.length === 0) {
    stickyTitle.textContent = 'Выберите свой материал'
    stickySummary.textContent = 'Два PDF на выбор'
    stickyAction.innerHTML = 'Выбрать PDF <span>↓</span>'
  } else {
    stickyTitle.textContent = selected.length === 1 ? 'Материал выбран' : 'Выбраны оба материала'
    stickySummary.textContent = `${selected.length} ${selected.length === 1 ? 'файл' : 'файла'} · ${sum} ₽`
    if (emailInput.validity.valid && emailInput.value.trim()) {
      stickyTitle.textContent = 'Всё готово к оплате'
      stickyAction.innerHTML = 'Оплатить <span>↗</span>'
    } else {
      stickyAction.innerHTML = 'Ввести email <span>↓</span>'
    }
  }
}
checks.forEach((check) => check.addEventListener('change', updateTotal))
emailInput.addEventListener('input', updateTotal)
stickyAction.addEventListener('click', () => {
  if (!checks.some((check) => check.checked)) {
    scrollTo('#catalog')
  } else if (emailInput.validity.valid && emailInput.value.trim()) {
    orderForm.requestSubmit()
  } else {
    scrollTo('#checkout')
    emailInput.focus({ preventScroll: true })
  }
})
orderForm.addEventListener('submit', (event) => { event.preventDefault(); const message = document.querySelector<HTMLElement>('#message')!; message.textContent = checks.some((check) => check.checked) ? 'Форма готова. Подключим Robokassa следующим шагом.' : 'Выберите хотя бы один материал.' })

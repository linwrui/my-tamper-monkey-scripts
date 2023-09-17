// ==UserScript==
// @name         提取图表配色
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       linwrui
// @require      https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.19/lodash.js
// ==/UserScript==

;(async function () {
  'use strict'

  // Your code here...
  const layers = document.querySelector('#layers')
  let promise
  let count = 0
  let totalCount = 0
  const children = _.sortBy(
    _.toArray(layers.children),
    o => Number(o.style.top.replace('px', '')),
    o => Number(o.style.left.replace('px', ''))
  )
  for (let i = 0; i < children.length; i++) {
    const el = children[i]
    if (promise) {
      await promise
    }
    if (!el.click) {
      return
    }
    if (count === 8) {
      console.log('--------')
      count = 0
    }
    el.click()
    promise = new Promise(resolve =>
      setTimeout(() => {
        const colorFillSection = _.toArray(document.querySelectorAll('section')).find(o => o.firstChild.textContent === '填充')
        const colorItem =
          (colorFillSection && colorFillSection.querySelector('.item.items-group[data-label*="颜色"]')) ||
          (colorFillSection && colorFillSection.querySelector('.item.items-group[data-label*="渐变"]'))
        if (colorItem) {
          const isGradiant = colorItem.getAttribute('data-label').includes('渐变')
          if (isGradiant) {
            let colors = []
            const colorInputs = _.toArray(colorItem.querySelectorAll('input[data-color]')).reverse()
            console.log(JSON.stringify(colorInputs.map(o => o.value)))
          } else {
            console.log(colorItem.querySelector('input[data-color]').value)
          }
          count += 1
          totalCount += 1
        } else {
          // ignore
        }
        resolve()
      }, 80)
    )
  }
  setTimeout(() => {
    window.alert('done!' + totalCount)
  }, 80)
})()

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
  console.log('start!')
  // Your code here...
  const colorPalette = {
    default: {
      label: '七彩缤纷',
      colorList: [],
      colorStops: [],
    },
    blueTech: {
      label: '蓝色科技',
      colorList: [],
      colorStops: [],
    },
    blueBusiness: {
      label: '蓝色商务',
      colorList: [],
      colorStops: [],
    },
    blueSimple: {
      label: '蓝色简约',
      colorList: [],
      colorStops: [],
    },
    greenFresh: {
      label: '绿色清新',
      colorList: [],
      colorStops: [],
    },
    greenSimple: {
      label: '绿色简约',
      colorList: [],
      colorStops: [],
    },
    blueQuiet: {
      label: '蓝色静谧',
      colorList: [],
      colorStops: [],
    },
    greenTech: {
      label: '绿色科技',
      colorList: [],
      colorStops: [],
    },
    orangeBusiness: {
      label: '橙色商务',
      colorList: [],
      colorStops: [],
    },
    blueFresh: {
      label: '蓝色清新',
      colorList: [],
      colorStops: [],
    },
    greenBusiness: {
      label: '绿色商务',
      colorList: [],
      colorStops: [],
    },
    orangeWarm: {
      label: '橙色温暖',
      colorList: [],
      colorStops: [],
    },
  }
  const colorPaletteList = Object.keys(colorPalette).map(key => colorPalette[key])
  const layers = document.querySelector('#layers')
  let promise
  let count = 0
  let totalCount = 0
  let colorPaletteIndex = 0
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
      colorPaletteIndex += 1
    }
    el.click()
    promise = new Promise(resolve =>
      setTimeout(() => {
        const colorFillSection = _.toArray(document.querySelectorAll('section')).find(o => o.firstChild.textContent === '填充')
        const colorItem =
          (colorFillSection && colorFillSection.querySelector('.item.items-group[data-label*="颜色"]')) ||
          (colorFillSection && colorFillSection.querySelector('.item.items-group[data-label*="渐变"]'))
        if (colorItem) {
          const isGradient = colorItem.getAttribute('data-label').includes('渐变')
          if (isGradient) {
            const colorInputs = _.toArray(colorItem.querySelectorAll('input[data-color]'))
            colorPaletteList[colorPaletteIndex].colorList.push(colorInputs[0].value.split(' ')[0])
            colorPaletteList[colorPaletteIndex].colorStops.push(
              colorInputs.map((o, index) => {
                const value = o.value.split(' ')
                return {
                  color: value[0],
                  offset: index === 0 ? 0 : Number(((index + 1) / colorInputs.length).toFixed(1)),
                }
              })
            )
            console.log(JSON.stringify(colorInputs.map(o => o.value)))
          } else {
            colorPaletteList[colorPaletteIndex].colorList.push(colorItem.querySelector('input[data-color]').value.split(' ')[0])
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

  if (promise) {
    await promise
  }

  console.log(colorPalette)

  setTimeout(() => {
    window.alert('配色方案提取完成，请到控制台查看并复制结果')
  }, 80)
})()

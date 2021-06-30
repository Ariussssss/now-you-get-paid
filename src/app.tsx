import React from 'react'
import './app.less'
import { usePaid } from './hooks'
import { defaultParams } from './utils'

const href =
  location.href.split('?')[0] +
  '?' +
  Object.entries(defaultParams)
    .map((e) => e.join('='))
    .join('&')

export default function App() {
  const { percent, oneDayPaid } = usePaid()
  const [left, right = '0'] = (Math.ceil(oneDayPaid * percent * 1000) / 1000)
    .toString()
    .split('.')
  const reward = [left, right.padEnd(3, '0')].join('.')
  return (
    <div className="paid-wrapper">
      <p className="paid-title">NOW U GET PAID</p>

      <div className="paid-bar">
        <div
          className="paid-bar-inner"
          style={{ width: `${percent * 95 + 5}%` }}
        >
          <div className="paid-toast">
            <p>今天已经赚了 {reward} 元</p>
            <p> {percent === 1 ? '🎮 下班啦' : `🧱 目标 ${oneDayPaid} 元`} </p>
          </div>
        </div>
      </div>
      <div className="paid-tutorial">
        <p>通过网址访问访问, 参数会被缓存, 默认值：</p>
        <p className="paid-tutorial-code">{href}</p>
      </div>
    </div>
  )
}

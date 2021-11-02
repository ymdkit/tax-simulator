import React, { useEffect, useRef, useState } from "react";
import { incomeTax } from "../lib/income_tax";
import {
  employmentInsurance,
  healthInsurance,
  pensionInsurance,
  socialInsurance,
} from "../lib/insurance";
import { residentTax } from "../lib/resident_tax";

export default function Home() {
  const [salary, setSalary] = useState(1000000);
  const [miscellaneousIncome, setMiscellaneousIncome] = useState(200000);
  const [barWidth, setBarWidth] = useState(1000);
  const [speed, setSpeed] = useState(10000);

  const timerRef = useRef(null);

  const startCount = () => {
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      setSalary((salary) => salary + speed);
    }, 16);
  };

  const stopCount = () => {
    if (timerRef.current === null) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetCount = () => {
    if (timerRef.current !== null) return;

    setSalary(0);
    setMiscellaneousIncome(0)
  };

  useEffect(() => {
    setBarWidth(window.innerWidth - 100);
  }, []);

  const totalIncome = salary + miscellaneousIncome

  const disposableIncome =
    totalIncome - socialInsurance(salary) - incomeTax(salary, totalIncome) - residentTax(salary, totalIncome);

  return (
    <div className="p-5">
      <div className="flex">
        <div className={`bg-gray-500 h-12`} style={{ width: barWidth * salary / totalIncome }}>
          <p className="text-white text-center">
            年収：
            {salary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className={`bg-black h-12`} style={{ width: barWidth * miscellaneousIncome / totalIncome }}>
          {/* <p className="text-white text-center text-sm">
            雑所得：
            {miscellaneousIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p> */}
        </div>
      </div>

      <div className="flex">
        <div
          className={`bg-blue-500 h-12`}
          style={{ width: (barWidth * socialInsurance(salary)) / totalIncome }}
        >
          <p className="text-white text-center text-sm">
            社会保険料：
            {socialInsurance(salary).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div
          className={`bg-indigo-500 h-12`}
          style={{ width: (barWidth * incomeTax(salary, totalIncome)) / totalIncome }}
        >
          <p className="text-white text-center text-sm">
            所得税：
            {incomeTax(salary, totalIncome).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div
          className={`bg-purple-500 h-12`}
          style={{ width: (barWidth * residentTax(salary, totalIncome)) / totalIncome }}
        >
          <p className="text-white text-center text-sm">
            住民税：
            {residentTax(salary, totalIncome).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <div
          className={`bg-pink-500 h-12`}
          style={{ width: (barWidth * disposableIncome) / totalIncome }}
        >
          <p className="text-white text-center">
            可処分所得：
            {disposableIncome.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>

      <div className="flex">
        <div
          className={`bg-red-500 h-12`}
          style={{ width: (barWidth * healthInsurance(salary)) / totalIncome }}
        />
        <div
          className={`bg-yellow-500 h-12`}
          style={{ width: (barWidth * pensionInsurance(salary)) / totalIncome }}
        />
        <div
          className={`bg-green-500 h-12`}
          style={{ width: (barWidth * employmentInsurance(salary)) / totalIncome }}
        />
        <div
          className={`bg-white h-12`}
          style={{
            width: (barWidth * (salary - socialInsurance(salary))) / totalIncome,
          }}
        />
      </div>

      <div className="mt-5">
        <ul>
          <li>
            <p>
              <span className={`text-gray-500 p-3`}>●</span>年収：{salary}
            </p>
          </li>
          <li>
            <p>
              <span className={`text-black p-3`}>●</span>雑所得：{miscellaneousIncome}
            </p>
          </li>
          <li>
            <p>
              <span className={`text-blue-500 p-3`}>●</span>社会保険料：
              {socialInsurance(salary).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <ul className="ml-3">
              <li>
                <p>
                  <span className={`text-red-500 p-3`}>●</span>健康保険：
                  {healthInsurance(salary).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </li>
              <li>
                <p>
                  <span className={`text-yellow-500 p-3`}>●</span>厚生年金：
                  {pensionInsurance(salary).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </li>
              <li>
                <p>
                  <span className={`text-green-500 p-3`}>●</span>雇用保険：
                  {employmentInsurance(salary).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </li>
            </ul>
          </li>

          <li>
            <p>
              <span className={`text-indigo-500 p-3`}>●</span>所得税：
              {incomeTax(salary, totalIncome).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </li>
          <li>
            <p>
              <span className={`text-purple-500 p-3`}>●</span>住民税：
              {residentTax(salary, totalIncome).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </li>
          <li>
            <p>
              <span className={`text-pink-500 p-3`}>●</span>可処分所得：
              {disposableIncome.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-5">
        <p>年収から計算する</p>
        <div className="mt-2 flex gap-2">
          <label htmlFor="salary">年収</label>
          <input
            id="salary"
            className="border-2"
            placeholder="年収"
            type="number"
            value={salary}
            onChange={(it) => setSalary(Number(it.target.value))}
          ></input>
          <label htmlFor="miscellaneousIncome">雑所得</label>
          <input
            id="miscellaneousIncome"
            className="border-2"
            placeholder="雑所得"
            type="number"
            value={miscellaneousIncome}
            onChange={(it) => setMiscellaneousIncome(Number(it.target.value))}
          ></input>
        </div>
      </div>

      <div className="mt-5">
        <p>アニメーションで見る</p>
        <div className="mt-2 flex gap-2">
          <label htmlFor="speed">上昇速度</label>
          <input
            id="speed"
            className="border-2"
            placeholder="上昇速度"
            type="number"
            value={speed}
            onChange={(it) => setSpeed(Number(it.target.value))}
          ></input>
          <button
            className="cursor-pointer p-2 bg-gray-500 rounded text-white"
            onClick={() => startCount()}
          >
            スタート
          </button>
          <button
            className="cursor-pointer p-2 bg-gray-500 rounded text-white"
            onClick={() => stopCount()}
          >
            ストップ
          </button>
          <button
            className="cursor-pointer p-2 bg-gray-500 rounded text-white"
            onClick={() => resetCount()}
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}

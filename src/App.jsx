import { useState } from "react";

const pages = [
  "인트로", "용도선택", "상품선택", "리본문구", "주문정보", "결제", "주문완료", "마이페이지"
];

const Button = ({ children, className = '', ...props }) => (
  <button className={\`bg-blue-600 text-white rounded px-4 py-2 w-full \${className}\`} {...props}>{children}</button>
);

const Card = ({ children }) => (
  <div className="border rounded shadow-sm bg-white mb-4">{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={\`p-4 \${className}\`}>{children}</div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    purpose: "", product: "", ribbonLeft: "", ribbonRight: "",
    sender: "", senderPhone: "", receiver: "", receiverPhone: "",
    address: "", note: "", payment: ""
  });

  const next = () => setStep((s) => Math.min(s + 1, pages.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const update = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div className="p-6 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">꽃맘전 - {pages[step]}</h1>
      {/* 생략: 각 화면 step === n 의 JSX 구조 */}
      <div className="flex justify-between mt-6 text-sm text-gray-500">
        <button onClick={prev} disabled={step === 0} className="text-blue-600">이전</button>
        <span>Step {step + 1} / {pages.length}</span>
      </div>
    </div>
  );
}

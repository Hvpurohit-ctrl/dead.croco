import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Receipt,
  Download,
  Printer,
  HelpCircle,
  TrendingUp,
  CheckCircle,
  FileText,
  Calendar,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Payslip } from '../../lib/types';

export const TransparentPayslips: React.FC = () => {
  const { currentUser, payslips } = useAppState();
  const { t } = useLanguage();

  const userPayslips = payslips.filter(p => p.userId === currentUser.id);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip>(userPayslips[0] || payslips[0]);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  if (!selectedPayslip) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
        <Receipt className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-700">No payslips found for this account.</h3>
      </div>
    );
  }

  const { deductions } = selectedPayslip;
  const totalDeductions = deductions.providentFund + deductions.esiHealthcare + deductions.welfareCess + deductions.advanceDeduction;

  return (
    <div className="space-y-6">
      {/* Header & Period Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            {t.worker.payslips}
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Salary Breakdown & Auditing
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Decent Work Standard: Transparent calculation without hidden wage withholding.
          </p>
        </div>

        {/* Pay Period Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {userPayslips.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPayslip(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                selectedPayslip.id === p.id
                  ? 'bg-forest-900 text-white border-forest-900 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{p.monthYear}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Salary Card */}
      <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-forest-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                Verified Salary Disbursed
              </span>
              <span className="text-xs text-emerald-200/80">Ref: {selectedPayslip.transactionRef}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black mt-2 font-mono tracking-tight text-white">
              ₹{selectedPayslip.netSalary.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-emerald-200 mt-1 font-medium">
              Net Take-Home Salary for {selectedPayslip.monthYear}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFormulaModal(true)}
              className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-emerald-200 text-xs font-bold flex items-center gap-2 border border-forest-700 transition"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>How Is This Calculated?</span>
            </button>

            <button
              onClick={() => setShowPrintModal(true)}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-forest-950 text-xs font-extrabold flex items-center gap-2 shadow-md transition"
            >
              <Printer className="w-4 h-4 text-forest-800" />
              <span>{t.worker.printPayslip}</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 rounded-2xl bg-forest-900/60 border border-forest-800">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">Standard Pay</span>
            <div className="text-lg font-bold font-mono text-white mt-0.5">₹{selectedPayslip.regularPay.toLocaleString('en-IN')}</div>
            <p className="text-[10px] text-emerald-200/70">{selectedPayslip.regularHours} hrs @ ₹{selectedPayslip.baseRatePerHour}/hr</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-900/60 border border-forest-800">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">Overtime Pay (1.5x)</span>
            <div className="text-lg font-bold font-mono text-emerald-300 mt-0.5">₹{selectedPayslip.overtimePay.toLocaleString('en-IN')}</div>
            <p className="text-[10px] text-emerald-200/70">{selectedPayslip.overtimeHours} hrs @ ₹{selectedPayslip.overtimeRatePerHour}/hr</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-900/60 border border-forest-800">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">Allowances</span>
            <div className="text-lg font-bold font-mono text-white mt-0.5">₹{selectedPayslip.specialAllowances.toLocaleString('en-IN')}</div>
            <p className="text-[10px] text-emerald-200/70">Site & Hazard Bonus</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-900/60 border border-forest-800">
            <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider block">Total Deductions</span>
            <div className="text-lg font-bold font-mono text-rose-200 mt-0.5">-₹{totalDeductions.toLocaleString('en-IN')}</div>
            <p className="text-[10px] text-rose-200/70">PF + ESI + Welfare</p>
          </div>
        </div>
      </div>

      {/* Detailed Transparent Line-Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Earnings Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Itemized Earnings</span>
            </h4>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Gross: ₹{selectedPayslip.grossSalary.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Base Shift Hours</p>
                <p className="text-[11px] text-slate-500">{selectedPayslip.regularHours} standard hours at ₹{selectedPayslip.baseRatePerHour}/hr</p>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{selectedPayslip.regularPay.toLocaleString('en-IN')}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Overtime Hours (Statutory 1.5x Premium)</p>
                <p className="text-[11px] text-emerald-600 font-semibold">{selectedPayslip.overtimeHours} hours at ₹{selectedPayslip.overtimeRatePerHour}/hr</p>
              </div>
              <span className="font-mono font-bold text-emerald-700">₹{selectedPayslip.overtimePay.toLocaleString('en-IN')}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Special Site & Risk Allowance</p>
                <p className="text-[11px] text-slate-500">Industry hazardous environment compliance</p>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{selectedPayslip.specialAllowances.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Deductions Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Statutory & Benefit Deductions</span>
            </h4>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
              Total: ₹{totalDeductions.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Employee Provident Fund (EPF 12%)</p>
                <p className="text-[11px] text-slate-500">Government retirement security savings account</p>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{deductions.providentFund.toLocaleString('en-IN')}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">ESI Medical Healthcare (0.75%)</p>
                <p className="text-[11px] text-slate-500">Hospitalisation & family clinical coverage</p>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{deductions.esiHealthcare.toLocaleString('en-IN')}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Labour Welfare Cess</p>
                <p className="text-[11px] text-slate-500">State statutory safety board contribution</p>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{deductions.welfareCess.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formula Explainer Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span>Transparent Calculation Rules</span>
              </h3>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-4 text-xs sm:text-sm text-slate-600">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80">
                <span className="font-bold text-forest-950 block text-xs uppercase mb-1">Standard Pay:</span>
                <code className="text-xs font-mono font-bold text-forest-900">
                  {selectedPayslip.regularHours} Regular Hours × ₹{selectedPayslip.baseRatePerHour}/hr = ₹{selectedPayslip.regularPay}
                </code>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80">
                <span className="font-bold text-forest-950 block text-xs uppercase mb-1">Overtime Pay (1.5x Multiplier):</span>
                <code className="text-xs font-mono font-bold text-forest-900">
                  {selectedPayslip.overtimeHours} OT Hours × (₹{selectedPayslip.baseRatePerHour} × 1.5) = ₹{selectedPayslip.overtimePay}
                </code>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs uppercase mb-1">Net Pay Formula:</span>
                <code className="text-xs font-mono font-bold text-slate-800">
                  Gross Pay (₹{selectedPayslip.grossSalary}) - Total Deductions (₹{totalDeductions}) = Net Take-Home (₹{selectedPayslip.netSalary})
                </code>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
                All rates are strictly governed by statutory labor agreements. dead.croco maintains zero tolerance for unrecorded overtime or unexpected deductions.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="w-full py-3 rounded-xl bg-forest-900 text-white font-bold text-xs"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Payslip Modal / Printable Area */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto printable-area">
            {/* Top Bar inside modal */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Official Pay Document
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Pay Receipt Layout */}
            <div className="pt-6 space-y-6">
              {/* Header with dead.croco logo */}
              <div className="flex items-start justify-between border-b pb-6 border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 p-0.5">
                    <img src="/logo.webp" alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">dead.croco</h2>
                    <p className="text-[10px] font-extrabold tracking-widest text-emerald-800 uppercase">
                      BE DEAD LIKE CROCO
                    </p>
                    <p className="text-[11px] text-slate-500">Official Workforce Remuneration Voucher</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 block">Period: {selectedPayslip.monthYear}</span>
                  <span className="text-[10px] text-slate-500">Ref: {selectedPayslip.transactionRef}</span>
                  <span className="text-[10px] text-emerald-700 font-bold block">Status: DISBURSED</span>
                </div>
              </div>

              {/* Employee & Org Details */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Employee</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedPayslip.userName}</p>
                  <p className="text-slate-600">{selectedPayslip.jobTitle}</p>
                  <p className="text-slate-500">{selectedPayslip.department}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Organization</span>
                  <p className="font-bold text-slate-900 text-sm">
                    {selectedPayslip.industry === 'construction' ? 'Metro Rail Viaduct Project' : 'SRM Campus Facilities'}
                  </p>
                  <p className="text-slate-600 capitalize">Sector: {selectedPayslip.industry}</p>
                  <p className="text-slate-500">Payment Date: {selectedPayslip.paymentDate}</p>
                </div>
              </div>

              {/* Breakdown Table */}
              <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th className="p-2.5 text-left">Earnings Category</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                    <th className="p-2.5 text-left border-l border-slate-200">Deductions</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5">Basic Hours ({selectedPayslip.regularHours}h @ ₹{selectedPayslip.baseRatePerHour})</td>
                    <td className="p-2.5 text-right font-mono font-bold">₹{selectedPayslip.regularPay}</td>
                    <td className="p-2.5 border-l border-slate-200">Provident Fund (EPF)</td>
                    <td className="p-2.5 text-right font-mono">₹{deductions.providentFund}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Overtime (1.5x) ({selectedPayslip.overtimeHours}h @ ₹{selectedPayslip.overtimeRatePerHour})</td>
                    <td className="p-2.5 text-right font-mono font-bold text-emerald-800">₹{selectedPayslip.overtimePay}</td>
                    <td className="p-2.5 border-l border-slate-200">ESI Medical Health</td>
                    <td className="p-2.5 text-right font-mono">₹{deductions.esiHealthcare}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Site / Environment Allowance</td>
                    <td className="p-2.5 text-right font-mono font-bold">₹{selectedPayslip.specialAllowances}</td>
                    <td className="p-2.5 border-l border-slate-200">Labour Welfare Cess</td>
                    <td className="p-2.5 text-right font-mono">₹{deductions.welfareCess}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold border-t border-slate-300">
                    <td className="p-2.5">Gross Earnings</td>
                    <td className="p-2.5 text-right font-mono">₹{selectedPayslip.grossSalary}</td>
                    <td className="p-2.5 border-l border-slate-200">Total Deductions</td>
                    <td className="p-2.5 text-right font-mono text-rose-700">₹{totalDeductions}</td>
                  </tr>
                </tbody>
              </table>

              {/* Net Pay Box */}
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">NET TAKE-HOME SALARY</span>
                  <span className="text-[10px] text-emerald-700">Electronic Bank/UPI Transfer Verified</span>
                </div>
                <div className="text-2xl font-black font-mono text-forest-950">
                  ₹{selectedPayslip.netSalary.toLocaleString('en-IN')}
                </div>
              </div>

              {/* UN SDG 8 watermark / footer text */}
              <div className="text-[10px] text-slate-400 text-center pt-4 border-t border-slate-100">
                dead.croco Workforce Platform • Aligned with UN SDG 8 (Decent Work & Economic Growth) • Certified Electronic Wage Document
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import Header from "@/components/layout/Header";
import LoanInputs from "@/components/calculator/LoanInputs";
import SummaryCards from "@/components/calculator/SummaryCards";
import SensitivityTable from "@/components/features/SensitivityTable";
import ModeTabs from "@/components/features/ModeTabs";
import AmortizationTable from "@/components/amortization/AmortizationTable";

 function Home() {
   return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />

  <div className="mt-4 w-full lg:w-[32%]">
  <ModeTabs />
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
  <LoanInputs />

  <div className="lg:col-span-2 space-y-4">
    <SummaryCards />
    <SensitivityTable />
  </div>
</div>

<div className="mt-6">
  <AmortizationTable />
</div>
    </div>
  );
}

export default Home;
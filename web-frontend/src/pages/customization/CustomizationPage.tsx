import CategoryList from "../../components/customization/CategoryList";
import BudgetManager from "../../components/customization/BudgetManager";
import RecurringManager from "../../components/customization/RecurringManager";

const CustomizationPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <CategoryList />
        <BudgetManager />
        <RecurringManager />
      </div>
    </>
  );
}

export default CustomizationPage;

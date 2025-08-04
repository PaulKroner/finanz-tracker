import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { getAllCategories } from "../../api/customization/GetAllCategories";
import type { Category } from "../../types/types";
import DesktopCategoryOptions from "./desktop/DesktopCategoryOptions";
import MobileCategoryOptions from "./mobile/MobileCategoryOptions";
import AddCategoryButton from "./buttons/AddCategoryButton";

const CategoryList = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };

    fetchCategories();

  }, []);

  return (
    <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
      <h2 className="text-lg font-semibold mb-4">Liste der Kategorien</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.title}</TableCell>
              <TableCell className="flex justify-center">
                <section className="hidden md:flex">
                  <DesktopCategoryOptions category={category} setCategories={setCategories} />
                </section>

                <section className="md:hidden">
                  <MobileCategoryOptions category={category} setCategories={setCategories} />
                </section>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
          <AddCategoryButton />
      </div>

    </div>
  );
}

export default CategoryList;
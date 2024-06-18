import { Button } from "@/components/ui/button";
import ListLaptop from "./List";

export default function Laptop() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/laptop/new">
                    <Button>Cadastrar Livro</Button>
                </a>
            </div>
            <ListLaptop />
        </div>
    )
}
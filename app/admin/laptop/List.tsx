import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { revalidatePath } from "next/cache"

  interface ILaptop{
    id:number,
    model:string,
    description: string,
  }
  
  export default async function ListLaptop() {
    const laptops = await list()
    async function list(){
      revalidatePath("/admin/laptop")
      const response = await fetch("https://server20241-beige.vercel.app/laptops")
        return response.json();
    }

    async function deleteLaptop(formData: FormData) {
      "use server"
      const id = formData.get("id") as string;
      const response = await fetch("https://server20241-beige.vercel.app/laptops/"+id, {method: "DELETE"});
      revalidatePath("/admin/laptop")
  
    }

    return (
      <Table>
        <TableCaption>Lista de computadores</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laptops.map((item:ILaptop) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
              <form>
                <input type="text" hidden title="id" value={item.id} />
                <Button variant="destructive" formAction={deleteLaptop}>EXCLUIR</Button>
              </form>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  
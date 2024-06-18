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

  interface Ileptp{
    id:number,
    name:string,
  }
  
  export default async function Listleptp() {
    const leptps = await list()
    async function list(){
      revalidatePath("/admin/leptop")
      const response = await fetch("https://server20241-beige.vercel.app/laptop/")
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
        <TableCaption>Lista de Computadores</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laptops.map((item:ILaptop) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive" formAction={deleteLaptop}>EXCLUIR</Button>
              </form>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  
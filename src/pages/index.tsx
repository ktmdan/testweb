import { Inter } from "next/font/google";
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const url = "http://localhost:4000"
    const [rows, setRows] = useState<RetRow[]>([])
    const [totalTime,setTotalTime] = useState(0)

    useEffect(() => {
        const a = async () => {
            const randPhones = randomPhones()
            const ts = new Date().getTime()
            const r:Req = {
                Phones: randPhones
            }
            try {
                const fr = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(r),
                })
                const b = await fr.json() as Ret;
                console.log(b)
                setRows(b.Rows)
                setTotalTime(new Date().getTime() - ts)
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
        a()
    },[])

  return (
    <>
      <h2>BLA Test Web App</h2>
      <br/>
        <table border={1} style={{minWidth: 500}}>
            <tbody>
        {rows.map((r,i) => (
            <tr key={i}><td>{r.Phone}</td><td>{r.Code}</td><td>{r.Status}</td></tr>
        ))}
            </tbody>
        </table>
        <br/>
        <p>Total Time: {totalTime}ms</p>
        <p>Total Count: {rows.length}</p>
    </>
  );
}

interface Req {
    Phones: string[]
}

interface Ret {
    Rows : RetRow[]
}
interface RetRow {
    Phone: string
    Code: string
    Status: string
}

/*
write a function that will generate between 900 and 1200 random phone numbers
 */
function randomPhones(): string[] {
    const n = Math.floor(Math.random() * 301) + 900
    const a = []
    for (let i = 0; i < n; i++) {
        a.push(randomPhone())
    }
    a.push("+19999999999")
    return a
}
/*
write a function that will generate a random 4 digit number padding 0 if necessary
 */
function randomPhone(): string {
    const n = Math.floor(Math.random() * 10000)
    return "+1714818" + n.toString().padStart(4, "0")
}

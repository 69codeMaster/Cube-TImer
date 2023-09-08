import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./swal.css";

const MySwal = withReactContent(Swal);
export async function NotInsertedToDb(message) {
  // swal.fire({
  //   customClass: "swal",
  //   title: "Oops finished early again?",
  //   text: message,
  //   icon: "warning",
  //   confirmButtonText: "😔",
  //   allowEnterKey: false,
  // });
  alert("solve was not inserted to DB");
}

export async function DelteSolveAlert(message) {
  const result = await MySwal.fire({
    icon: "warning",
    iconColor: "#05386b",
    text: "you suck that much hah?",
    title: message,
    confirmButtonText: "yes",
    confirmButtonColor: "#8ee4af",
    denyButtonColor: "#05386b",
    denyButtonText: "no",
    showDenyButton: true,
  });

  return result.isConfirmed;
}

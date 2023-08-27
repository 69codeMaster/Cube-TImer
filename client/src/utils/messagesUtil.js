import swal from "sweetalert2";
import "./swal.css";

window.Swal = swal;

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

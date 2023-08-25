import swal from "sweetalert2";
window.Swal = swal;
export function NotInsertedToDb(message) {
  swal.fire({
    title: "Oops finished early again?",
    text: message,
    icon: "warning",
    confirmButtonText: "😔",
  });
}

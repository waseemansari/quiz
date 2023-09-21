import swal from "sweetalert2";
export default function WarningAlert() {

    return (
        new swal({
            title: "Are you sure?",
            text: "Are you want to delete this permanently",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        })
        .then(confirmButtonText => {
          if (confirmButtonText.isConfirmed) {
            return true;
          }else{
            return false;
           }
        })
  )

}
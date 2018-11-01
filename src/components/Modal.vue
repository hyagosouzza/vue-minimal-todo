<template>
    <div>
        <!-- Modal -->
        <div class="modal show fade" id="exampleModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" 
                       placeholder="Novo nome da tarefa" 
                       class="p-4 mb-4 w-full bg-transparent border-grey-light text-white border rounded">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        <div class="modal-backdrop fade show"></div>
    </div>    
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

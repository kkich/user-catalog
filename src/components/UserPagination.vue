<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination__btn">Назад</button>

    <span class="pagination__info"> Страница {{ currentPage }} из {{ totalPages }} </span>

    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination__btn">
      Вперед
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  emits: ['changePage'],
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('changePage', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('changePage', this.currentPage + 1)
      }
    },
  },
}
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination__btn {
  background: #2d9173;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.pagination__btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination__info {
  font-size: 16px;
  font-weight: bold;
}
</style>

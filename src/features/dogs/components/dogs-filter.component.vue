<template>
  <q-card>
    <q-form @submit.prevent="handleSubmit">
      <q-card-section
        :class="[
          $q.screen.lt.sm ? 'column' : 'row',
          'justify-center q-gutter-md',
        ]"
      >
        <div class="col">
          <q-input
            v-model="filtersDogState.name"
            label="Name"
            class="col-4"
            :dense="dense"
            filled
          />
        </div>
        <div class="col">
          <q-select
            v-model="filtersDogState.breedGroup"
            :options="breedGroupFilterOptions"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            label="Breed"
            no-caps
            class="col-4"
            :dense="dense"
            filled
          />
        </div>
      </q-card-section>

      <q-card-actions>
        <q-space />
        <q-btn
          color="white"
          text-color="black"
          label="Reset"
          icon="replay"
          type="button"
          @click="handleReset"
          :dense="dense"
          no-caps
        />
        <q-btn
          color="primary"
          label="Search"
          icon="search"
          type="submit"
          no-caps
          :dense="dense"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import {
  
  DogFilters,
} from "src/core/entities/dog/dog-filters.model";
import { BreedGroup } from "src/core/enums/breed-groups.enum";
import { ref, defineComponent, computed, PropType, reactive, watch } from "vue";

export default defineComponent({
  props: {
    filtersDog: {
      type: Object as PropType<DogFilters>,
      default: () =>
        ({
          name: "",
          breedGroup: BreedGroup.All,
        } as DogFilters),
    },
  },
  emits: ["submit", "reset"],
  setup(props: any, { emit }: { emit: Function }) {
    const $q = useQuasar();

    const dense = computed(() => $q.screen.lt.md);

    const filtersDogState = reactive<DogFilters>({ ...props.filtersDog });

    const breedGroupFilterOptions = computed<{ id: number; name: string }[]>(
      () =>
        Object.keys(BreedGroup).map((key) => ({
          id: key,
          name: BreedGroup[key as keyof typeof BreedGroup],
        })) as any
    );

    watch(
      () => props.filtersDog,
      (newValue: any) => {
        Object.assign(filtersDogState, newValue);
      },
      { deep: true }
    );

    function handleSubmit() {
      emit("submit", filtersDogState);
    }

    function handleReset() {
      filtersDogState.name = "";
      filtersDogState.breedGroup = BreedGroup.All;

      emit("reset");
    }

    return {
      dense,

      filtersDogState,
      breedGroupFilterOptions,

      handleSubmit,
      handleReset,
    };
  },
});
</script>

<template>
  <q-page padding class="">
    <q-card class="fit">
      <q-item class="bg-primary text-white q-mb-md">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="pets" size="md" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h5"> Dogs </q-item-label>
        </q-item-section>
      </q-item>

      <q-card-section>
        <dog-filter
          :filtersDog="filtersDog"
          @submit="handleSearchDog"
          @reset="handleSearchReset"
        />
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="viewTypeState"
          :options="viewTypeOptions"
          option-value="id"
          option-label="id"
          emit-value
          map-options
          label="View Type"
          no-caps
          class="col"
          dense
          filled
        />
      </q-card-section>

      <q-card-section v-if="viewTypeState === ViewType.Table">
        <dog-table :dogs="dogsState" :columns="columns" />
      </q-card-section>

      <q-card-section
        :class="`${
          dogsState.length >= 3 && 'row'
        } justify-center q-ma-auto flex-wrap`"
        v-if="viewTypeState != ViewType.Table"
      >
        <dog-card-table
          :dogs="dogsState"
          :columns="columns"
          :viewType="viewTypeState"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import DogTable from "../components/dogs-table.component.vue";
import DogCardTable from "../components/dogs-card-table.component.vue";
import DogFilter from "../components/dogs-filter.component.vue";
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  watch,
} from "vue";
import { useDogService } from "src/core/managers/dog.manager";
import { TableColumns } from "../models/table-columns";
import { DogFilters } from "src/core/entities/dog/dog-filters.model";
import { BreedGroup } from "src/core/enums/breed-groups.enum";
import { ViewType } from "src/core/enums/view-types.enum";

export default defineComponent({
  components: {
    DogTable,
    DogCardTable,
    DogFilter,
  },
  setup() {
    const dogService = useDogService();

    onMounted(async () => {
      await dogService.getDogs();
    });

    const isNew = ref(false);

    const viewTypeState = ref(ViewType.Table);

    const viewTypeOptions = computed<{ id: number; name: string }[]>(
      () =>
        Object.keys(ViewType).map((key) => ({
          id: ViewType[key as keyof typeof ViewType],
          name: key,
        })) as any
    );

    const dogs = computed(() => dogService.dogs);

    const dogsState = reactive<any>([]);

    watch(
      () => dogs.value,
      (newDogs: any) => {
        const newOrdersState = newDogs.map((dog: any) => {
          return {
            ...dog,
          };
        });

        dogsState.splice(0, dogsState.length, ...newOrdersState);
      }
    );

    const filtersDog = computed(() => dogService.filtersDog);

    function handleSearchDog(filtersDog: DogFilters) {
      let filteredDogs = dogs.value.filter((dog: any) => {
        return (
          (!dog?.name ||
            dog?.name.toLowerCase().includes(filtersDog.name.toLowerCase())) &&
          (dog?.breed_group === filtersDog.breedGroup ||
            filtersDog.breedGroup === BreedGroup.All)
        );
      });

      dogsState.splice(0, dogsState.length, ...filteredDogs);
    }

    function handleSearchReset() {
      dogsState.splice(0, dogsState.length, ...dogs.value);
    }

    return {
      columns: TableColumns,

      dogsState,

      isNew,
      filtersDog,
      handleSearchDog,
      handleSearchReset,
      viewTypeState,
      viewTypeOptions,
      ViewType,
    };
  },
});
</script>

import { setActivePinia, createPinia } from "pinia";
import { useDictionaryStore } from "~/store/index.js";

function search(query) {
  const store = useDictionaryStore();
  store.updateSearchQuery(query);

  return store.searchResults;
}

beforeEach(() => {
  setActivePinia(createPinia());
});

test("search words including 'ヴァヴィヴヴェヴォ' by 'ばびぶべぼ'", () => {
  const results = search("ベル・ゴレット");
  expect(results).toHaveLength(1);
  expect(results[0].ja).toBe("ヴェル・ゴレット");
});

test("a direct match in the 'ja' field should appear before a partial match in 'notes' field", () => {
  const results = search("雄鶏");
  const jaMatchIndex = results.findIndex(r => r.ja === "雄鶏");
  const notesMatchIndex = results.findIndex(r => r.id === "pulcinella");

  expect(jaMatchIndex).not.toBe(-1);
  expect(notesMatchIndex).not.toBe(-1);
  expect(jaMatchIndex).toBeLessThan(notesMatchIndex);
});
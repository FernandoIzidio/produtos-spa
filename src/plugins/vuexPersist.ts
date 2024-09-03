import { Store } from 'vuex';

export default function createPersistedState() {
    return (store: Store<any>) => {
        const savedState = localStorage.getItem('vuex');
        if (savedState) {
            store.replaceState(JSON.parse(savedState));
        }

        store.subscribe((mutation, state: any) => {
            localStorage.setItem('vuex', JSON.stringify(state));
        });
    };
}

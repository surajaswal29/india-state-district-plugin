import { statesData } from './data';
export class IndiaStateDistrict {
    constructor(options = {}) {
        this.options = {
            stateSelectId: 'state',
            districtSelectId: 'district',
            ...options
        };
        this.states = statesData;
        const stateElement = document.getElementById(this.options.stateSelectId);
        const districtElement = document.getElementById(this.options.districtSelectId);
        if (!stateElement || !districtElement) {
            throw new Error('State or district select elements not found');
        }
        this.stateSelect = stateElement;
        this.districtSelect = districtElement;
        this.initialize();
    }
    initialize() {
        this.populateStates();
        this.setupEventListeners();
        if (this.options.defaultState) {
            this.setDefaultState();
        }
    }
    populateStates() {
        this.stateSelect.innerHTML = '<option value="">Select State</option>';
        this.states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.name;
            option.textContent = state.name;
            this.stateSelect.appendChild(option);
        });
    }
    populateDistricts(stateName) {
        this.districtSelect.innerHTML = '<option value="">Select District</option>';
        const state = this.states.find(s => s.name === stateName);
        if (!state)
            return;
        state.districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            this.districtSelect.appendChild(option);
        });
        if (this.options.defaultDistrict) {
            this.setDefaultDistrict();
        }
    }
    setupEventListeners() {
        this.stateSelect.addEventListener('change', () => {
            const selectedState = this.stateSelect.value;
            this.populateDistricts(selectedState);
            this.triggerOnChange();
        });
        this.districtSelect.addEventListener('change', () => {
            this.triggerOnChange();
        });
    }
    setDefaultState() {
        if (this.options.defaultState) {
            this.stateSelect.value = this.options.defaultState;
            this.populateDistricts(this.options.defaultState);
        }
    }
    setDefaultDistrict() {
        if (this.options.defaultDistrict) {
            this.districtSelect.value = this.options.defaultDistrict;
        }
    }
    triggerOnChange() {
        if (this.options.onChange) {
            this.options.onChange(this.stateSelect.value, this.districtSelect.value);
        }
    }
    // Public methods
    getState() {
        return this.stateSelect.value;
    }
    getDistrict() {
        return this.districtSelect.value;
    }
    setState(state) {
        this.stateSelect.value = state;
        this.populateDistricts(state);
    }
    setDistrict(district) {
        this.districtSelect.value = district;
    }
}

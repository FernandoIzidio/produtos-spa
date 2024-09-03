
export default {
    clearError(errorId: string): void {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = "none";
        }
    },

    displayError(errorId: string, message: string): void {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = "block";
            errorElement.textContent = message;
        }
    },

    validateRequired(element: HTMLInputElement, fieldName: string): boolean {
        const value = element.value.trim();
        const errorId = "error-" + element.id;

        if (value === "") {
            this.displayError(errorId, `${fieldName} é obrigatório.`);
            return false;
        }

        return true;
    },

    validateZip(element: HTMLInputElement) {
        const isFilled = this.validateRequired(element, "CEP");
        if (isFilled) {

            if (!/^\d{5}-\d{3}$/.test(element.value)) return this.displayError("error-" + element.id, "CEP inválido.");

        }
    },

    validatePhone(element: HTMLInputElement, fieldName: string, isCellphone: boolean = false) {
        const isFilled = this.validateRequired(element, fieldName);
        if (isFilled) {
            const phone = element.value;
            const regex = isCellphone ? /^\(\d{2}\) 9\d{4}-\d{4}$/ : /^\(\d{2}\) \d{4}-\d{4}$/;

            if (!regex.test(phone)) return this.displayError("error-" + element.id, fieldName + " inválido.");

        }
    },

    validateEmail(element: HTMLInputElement) {
        const isFilled = this.validateRequired(element, "Email");
        if (isFilled) {
            const email = element.value;

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return this.displayError("error-" + element.id, "Email inválido.");

        }
    },

    validatePasswordStrength(element: HTMLInputElement) {
        const isFilled = this.validateRequired(element, "Senha");
        if (isFilled) {
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-={};':"\\|,.<>/?]{8,}$/.test(element.value)){
                return this.displayError("error-" + element.id, "Senha deve ter pelo menos 8 caracteres e conter um caracter maiúsculo, minúsculo, número e símbolo.");
            }
        }
    },

    validatePasswordMatching(element: HTMLInputElement, otherPassword: string) {
        const isFilled = this.validateRequired(element, "Senha");
        if (isFilled) {

            if (element.value !== otherPassword) return this.displayError("error-" + element.id, "Senhas devem corresponder.");

        }
    },

    isValidCpf(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf.charAt(9))) {
            return false;
        }

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }

        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        return remainder === parseInt(cpf.charAt(10));
    },

    validateCpf(element: HTMLInputElement) {
        const isFilled = this.validateRequired(element, "CPF");
        if (isFilled) {

            if (!this.isValidCpf(element.value)) return this.displayError("error-" + element.id, "CPF inválido.");

        }
    }

}

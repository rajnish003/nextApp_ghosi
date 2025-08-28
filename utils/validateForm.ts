interface ValidationRules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    email?: boolean;
    custom?: (value: string) => boolean | string;
}

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validateField = (value: string, rules: ValidationRules): ValidationResult => {
    const errors: string[] = [];

    // Check if field is required
    if (rules.required && !value.trim()) {
        errors.push('This field is required');
    }

    // Check minimum length
    if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Minimum length is ${rules.minLength} characters`);
    }

    // Check maximum length
    if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Maximum length is ${rules.maxLength} characters`);
    }

    // Check email format
    if (rules.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errors.push('Please enter a valid email address');
        }
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
        errors.push('Invalid format');
    }

    // Custom validation
    if (rules.custom) {
        const customResult = rules.custom(value);
        if (typeof customResult === 'string') {
            errors.push(customResult);
        } else if (!customResult) {
            errors.push('Invalid value');
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateForm = (
    formData: Record<string, string>,
    validationRules: Record<string, ValidationRules>
): Record<string, ValidationResult> => {
    const results: Record<string, ValidationResult> = {};

    for (const [field, rules] of Object.entries(validationRules)) {
        results[field] = validateField(formData[field] || '', rules);
    }

    return results;
};
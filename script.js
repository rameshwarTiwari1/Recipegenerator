document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipe-form');
    const recipeCard = document.getElementById('recipe-card');
    const themeSelect = document.getElementById('theme-select');
    const printBtn = document.getElementById('print-btn');
    const addIngredientBtn = document.getElementById('add-ingredient');
    const addInstructionBtn = document.getElementById('add-instruction');
    
    const previewElements = {
        name: document.getElementById('preview-name'),
        prep: document.getElementById('preview-prep'),
        cook: document.getElementById('preview-cook'),
        servings: document.getElementById('preview-servings'),
        ingredients: document.getElementById('preview-ingredients'),
        instructions: document.getElementById('preview-instructions')
    };

    function updatePreview() {
        const recipeName = document.getElementById('recipe-name').value.trim();
        const prepTime = document.getElementById('prep-time').value;
        const cookTime = document.getElementById('cook-time').value;
        const servings = document.getElementById('servings').value;

        previewElements.name.textContent = recipeName || 'Recipe Name';
        previewElements.prep.textContent = prepTime ? `${prepTime} min` : '-- min';
        previewElements.cook.textContent = cookTime ? `${cookTime} min` : '-- min';
        previewElements.servings.textContent = servings || '--';

        updateIngredientsList();
        updateInstructionsList();
    }

    function updateIngredientsList() {
        const ingredientInputs = document.querySelectorAll('.ingredient-input');
        const ingredientsList = previewElements.ingredients;
        
        ingredientsList.innerHTML = '';
        
        let hasIngredients = false;
        ingredientInputs.forEach(input => {
            const value = input.value.trim();
            if (value) {
                const li = document.createElement('li');
                li.textContent = value;
                ingredientsList.appendChild(li);
                hasIngredients = true;
            }
        });
        
        if (!hasIngredients) {
            const li = document.createElement('li');
            li.textContent = 'Add ingredients to see them here...';
            li.className = 'placeholder';
            ingredientsList.appendChild(li);
        }
    }

    function updateInstructionsList() {
        const instructionInputs = document.querySelectorAll('.instruction-input');
        const instructionsList = previewElements.instructions;
        
        instructionsList.innerHTML = '';
        
        let hasInstructions = false;
        let stepNumber = 1;
        
        instructionInputs.forEach(input => {
            const value = input.value.trim();
            if (value) {
                const li = document.createElement('li');
                li.textContent = value;
                instructionsList.appendChild(li);
                hasInstructions = true;
                stepNumber++;
            }
        });
        
        if (!hasInstructions) {
            const li = document.createElement('li');
            li.textContent = 'Add instructions to see them here...';
            li.className = 'placeholder';
            instructionsList.appendChild(li);
        }
    }

    function addIngredientField() {
        const container = document.getElementById('ingredients-container');
        const newItem = document.createElement('div');
        newItem.className = 'ingredient-item';
        newItem.innerHTML = `
            <input type="text" class="ingredient-input" placeholder="e.g., 1 cup sugar">
            <button type="button" class="remove-btn" onclick="removeIngredient(this)">×</button>
        `;
        container.appendChild(newItem);
        
        const newInput = newItem.querySelector('.ingredient-input');
        newInput.addEventListener('input', updatePreview);
        newInput.focus();
        
        updatePreview();
    }

    function addInstructionField() {
        const container = document.getElementById('instructions-container');
        const stepNumber = container.children.length + 1;
        const newItem = document.createElement('div');
        newItem.className = 'instruction-item';
        newItem.innerHTML = `
            <textarea class="instruction-input" placeholder="Step ${stepNumber}: Describe this step..."></textarea>
            <button type="button" class="remove-btn" onclick="removeInstruction(this)">×</button>
        `;
        container.appendChild(newItem);
        
        const newInput = newItem.querySelector('.instruction-input');
        newInput.addEventListener('input', updatePreview);
        newInput.focus();
        
        updatePreview();
    }

    function changeTheme() {
        const selectedTheme = themeSelect.value;
        recipeCard.className = `recipe-card theme-${selectedTheme}`;
    }

    function printRecipe() {
        window.print();
    }

    recipeForm.addEventListener('input', updatePreview);
    themeSelect.addEventListener('change', changeTheme);
    printBtn.addEventListener('click', printRecipe);
    addIngredientBtn.addEventListener('click', addIngredientField);
    addInstructionBtn.addEventListener('click', addInstructionField);

    const initialIngredientInput = document.querySelector('.ingredient-input');
    const initialInstructionInput = document.querySelector('.instruction-input');
    
    if (initialIngredientInput) {
        initialIngredientInput.addEventListener('input', updatePreview);
    }
    
    if (initialInstructionInput) {
        initialInstructionInput.addEventListener('input', updatePreview);
    }

    updatePreview();
});

function removeIngredient(button) {
    const ingredientItem = button.parentElement;
    const container = document.getElementById('ingredients-container');
    
    if (container.children.length > 1) {
        ingredientItem.remove();
    } else {
        const input = ingredientItem.querySelector('.ingredient-input');
        input.value = '';
    }
    
    updatePreview();
}

function removeInstruction(button) {
    const instructionItem = button.parentElement;
    const container = document.getElementById('instructions-container');
    
    if (container.children.length > 1) {
        instructionItem.remove();
        updateInstructionPlaceholders();
    } else {
        const textarea = instructionItem.querySelector('.instruction-input');
        textarea.value = '';
    }
    
    updatePreview();
}

function updateInstructionPlaceholders() {
    const instructionInputs = document.querySelectorAll('.instruction-input');
    instructionInputs.forEach((input, index) => {
        const stepNumber = index + 1;
        if (!input.value.trim()) {
            input.placeholder = `Step ${stepNumber}: Describe this step...`;
        }
    });
}

function updatePreview() {
    const previewElements = {
        name: document.getElementById('preview-name'),
        prep: document.getElementById('preview-prep'),
        cook: document.getElementById('preview-cook'),
        servings: document.getElementById('preview-servings'),
        ingredients: document.getElementById('preview-ingredients'),
        instructions: document.getElementById('preview-instructions')
    };

    const recipeName = document.getElementById('recipe-name').value.trim();
    const prepTime = document.getElementById('prep-time').value;
    const cookTime = document.getElementById('cook-time').value;
    const servings = document.getElementById('servings').value;

    previewElements.name.textContent = recipeName || 'Recipe Name';
    previewElements.prep.textContent = prepTime ? `${prepTime} min` : '-- min';
    previewElements.cook.textContent = cookTime ? `${cookTime} min` : '-- min';
    previewElements.servings.textContent = servings || '--';

    updateIngredientsList();
    updateInstructionsList();
}

function updateIngredientsList() {
    const ingredientInputs = document.querySelectorAll('.ingredient-input');
    const ingredientsList = document.getElementById('preview-ingredients');
    
    ingredientsList.innerHTML = '';
    
    let hasIngredients = false;
    ingredientInputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            const li = document.createElement('li');
            li.textContent = value;
            ingredientsList.appendChild(li);
            hasIngredients = true;
        }
    });
    
    if (!hasIngredients) {
        const li = document.createElement('li');
        li.textContent = 'Add ingredients to see them here...';
        li.className = 'placeholder';
        ingredientsList.appendChild(li);
    }
}

function updateInstructionsList() {
    const instructionInputs = document.querySelectorAll('.instruction-input');
    const instructionsList = document.getElementById('preview-instructions');
    
    instructionsList.innerHTML = '';
    
    let hasInstructions = false;
    
    instructionInputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            const li = document.createElement('li');
            li.textContent = value;
            instructionsList.appendChild(li);
            hasInstructions = true;
        }
    });
    
    if (!hasInstructions) {
        const li = document.createElement('li');
        li.textContent = 'Add instructions to see them here...';
        li.className = 'placeholder';
        instructionsList.appendChild(li);
    }
}
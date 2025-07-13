/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
// 1. Красная звезда, зеленый квадрат, все остальные белые
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }
    return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые
export const validateFieldN2 = ({ star, square, triangle, circle }) => {
    let greenCount = 0;
    if (star === 'green') greenCount++;
    if (square === 'green') greenCount++;
    if (triangle === 'green') greenCount++;
    if (circle === 'green') greenCount++;
    return greenCount >= 2;
};

// 3. Количество красных фигур равно кол-ву синих
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
    let redCount = 0;
    let blueCount = 0;
    
    [star, square, triangle, circle].forEach(shape => {
        if (shape === 'red') redCount++;
        if (shape === 'blue') blueCount++;
    });
    
    return redCount === blueCount;
};

// 4. Синий круг, красная звезда, оранжевый квадрат, треугольник любого цвета
export const validateFieldN4 = ({ star, square, triangle, circle }) => {
    return circle === 'blue' && 
           star === 'red' && 
           square === 'orange';
};

// 5. Три фигуры одного любого цвета кроме белого
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
    const colorCounts = {};
    const colors = [star, square, triangle, circle];
    
    colors.forEach(color => {
        if (color !== 'white') {
            colorCounts[color] = (colorCounts[color] || 0) + 1;
        }
    });
    
    return Object.values(colorCounts).some(count => count >= 3);
};

// 6. Ровно две зеленые фигуры (треугольник + еще одна), плюс одна красная
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
    let greenCount = 0;
    let redCount = 0;
    
    if (star === 'green') greenCount++;
    if (square === 'green') greenCount++;
    if (triangle === 'green') greenCount++;
    if (circle === 'green') greenCount++;
    
    if (star === 'red') redCount++;
    if (square === 'red') redCount++;
    if (triangle === 'red') redCount++;
    if (circle === 'red') redCount++;
    
    return greenCount === 2 && triangle === 'green' && redCount === 1;
};

// 7. Все фигуры оранжевые
export const validateFieldN7 = ({ star, square, triangle, circle }) => {
    return star === 'orange' && 
           square === 'orange' && 
           triangle === 'orange' && 
           circle === 'orange';
};

// 8. Не красная и не белая звезда
export const validateFieldN8 = ({ star }) => {
    return star !== 'red' && star !== 'white';
};

// 9. Все фигуры зеленые
export const validateFieldN9 = ({ star, square, triangle, circle }) => {
    return star === 'green' && 
           square === 'green' && 
           triangle === 'green' && 
           circle === 'green';
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = ({ square, triangle }) => {
    return triangle === square && triangle !== 'white';
};
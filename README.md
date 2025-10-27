# Numerical Scale Generator

## What is this project?

The **Numerical Scale Generator** is a versatile utility designed to produce a custom sequence of numbers based on a **fundamental starting value** and a **constant ratio** (or interval).

It serves as a flexible tool for generating **geometric progressions** for various fields, including:
* **Acoustics/Music Theory:** Generating precise frequencies for custom musical scales and tunings (e.g., Equal Temperament).
* **Design/Typography:** Defining scale relationships for font sizes and spacing (e.g., Major Second, Golden Ratio).
* **Engineering/Modeling:** Creating logarithmic or exponential data points.

---

## How It Works

The calculation generates a sequence of values by applying the defined ratio exponentially to the base value, allowing the user to control the span of the scale (lower and higher cycles).

### Input Fields

| Field | Description |
| :--- | :--- |
| **Base Value** | The starting number or base value of the scale (e.g., 440 Hz or 16 px). |
| **Ratio** | The constant multiplier used to move between scale steps (e.g., 1.05946 for a semitone, or 1.618 for the Golden Ratio). |
| **Steps Per Cycle** | The number of steps that define one full cycle or octave (e.g., 12 for a 12-tone scale). |
| **Cycles Above Base** | The number of full cycles/octaves to generate **above** the base value. |
| **Cycles Below Base** | The number of full cycles/octaves to generate **below** the base value. |

---

### Calculation Logic

The generation process involves calculating the frequency (or value) for each step relative à base value.

| Formula | Description | Simple Notation |
| :--- | :--- | :--- |
| **Individual Value** | The value of a step (i) from the base. The formula uses the n-th root of the Ratio. | `Value = Base Value * Ratio ^ ((1 / Steps Per Cycle) * i)` |
| **Scale Generation** | The scale is built by iterating the Individual Value formula from the lowest step up to the highest step. | `Steps = (Cycles Below Base * Steps Per Cycle * -1) to (Cycles Above Base * Steps Per Cycle)` |
| **Output Order** | The final sequence of values is **reversed** so the highest values are displayed first, flowing down to the lowest. | `Final Scale = Calculated Values reversed` |

---

### Output Fields

| Field | Description |
| :--- | :--- |
| **Output List** | The list displays the sequence of generated values. |
| **Primary Class** | Applied to values that correspond to the **base value** of each full cycle (e.g., the octave or base size). |
| **Secondary Class** | Applied to all intermediate values between the primary values. |

### Formatting Standards

* **Decimal Separator:** Uses the **dot (`.`)** for decimal separation.
* **Precision:** Values are rounded to six decimal places for high accuracy.

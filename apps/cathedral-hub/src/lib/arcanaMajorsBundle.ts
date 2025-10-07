// Arcana Majors Bundle Loader for Cathedral Hub
// This module loads and exposes the canonical 22 Majors bundle for use anywhere in the hub

import majors from '../../../../packages/data/arcana/majors/majors_22.json';

export const arcanaMajorsBundle = majors;

export type ArcanaMajor = typeof majors[number];

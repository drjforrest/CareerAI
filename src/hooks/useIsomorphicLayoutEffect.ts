import { useEffect, useLayoutEffect } from 'react';

// On the server, React emits a warning when calling useLayoutEffect.
// This is because useLayoutEffect does nothing on the server, as there is no layout to effect.
// Use this hook instead to avoid the warning while keeping the behavior
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;

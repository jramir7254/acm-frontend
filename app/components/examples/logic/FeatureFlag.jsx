export default function FeatureFlag({ isEnabled, children, fallback = null }) {
  return isEnabled ? children : fallback;
}

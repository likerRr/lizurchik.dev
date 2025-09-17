import dynamic from 'next/dynamic';

export const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then(m => {
      m.Modal.setAppElement('.notion-viewport');
      return m.Modal;
    }),
  {
    ssr: false,
  },
);

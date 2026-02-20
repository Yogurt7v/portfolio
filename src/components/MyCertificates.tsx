import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Certificate } from '../types/certificate';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import SectionHeader from '../ui/MyCertificates/SectionHeader';
import { certContainerVariants } from '../utils/animations';
import CertCard from '../ui/Achievements/CertCard';
import CertModal from '../ui/Achievements/CertModal';
import { certificates } from '../data/certificate';

const MyCertificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useLockBodyScroll(!!selectedCert);

  const handleSelectCert = (cert: Certificate) => setSelectedCert(cert);
  const handleCloseModal = () => setSelectedCert(null);

  return (
    <motion.section
      id="achievements"
      className="py-12 sm:py-24 px-4 max-w-6xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <SectionHeader title="Мои сертификаты" />

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6"
        variants={certContainerVariants}
      >
        {certificates.map((cert: Certificate, index: number) => (
          <CertCard
            key={cert.id}
            cert={cert}
            onSelect={handleSelectCert}
            custom={index}
          />
        ))}
      </motion.div>

      <CertModal cert={selectedCert} onClose={handleCloseModal} />
    </motion.section>
  );
};

export default MyCertificates;

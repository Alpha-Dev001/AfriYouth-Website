import test from 'node:test';
import assert from 'node:assert/strict';
import { ACCELERATOR_STAGES } from '../data/afriyouthContent.ts';
import {
  ACCELERATOR_PHASE_GROUPS,
  clampStageIndex,
  filterAcceleratorStages,
  getDefaultTopicForAudience,
  getFirstStageIndexForPhase,
  getPhaseMetaById,
  hasValidationErrors,
  validateInquiryForm,
  type InquiryFormValues,
} from './inquiryLogic.ts';

test('validateInquiryForm rejects empty required fields without substituting fallbacks', () => {
  const emptyValues: InquiryFormValues = {
    fullName: '   ',
    organization: '',
    email: '',
    audience: 'institution',
    topic: '',
    message: '',
  };

  const errors = validateInquiryForm(emptyValues);
  assert.equal(hasValidationErrors(errors), true);
  assert.ok(errors.fullName);
  assert.ok(errors.organization);
  assert.ok(errors.email);
  assert.ok(errors.topic);
  assert.ok(errors.message);
});

test('validateInquiryForm validates email format and minimum message length', () => {
  const invalidEmailValues: InquiryFormValues = {
    fullName: 'Amina Mensah',
    organization: '',
    email: 'not-an-email',
    audience: 'innovator',
    topic: 'Policy Innovation Challenge',
    message: 'Too short',
  };

  const errors = validateInquiryForm(invalidEmailValues);
  assert.equal(hasValidationErrors(errors), true);
  assert.equal(errors.organization, undefined, 'Organization is optional for young innovators');
  assert.ok(errors.email);
  assert.ok(errors.message);
});

test('validateInquiryForm passes valid partner inquiry', () => {
  const validValues: InquiryFormValues = {
    fullName: 'Kofi Boateng',
    organization: 'West Africa Policy Institute',
    email: 'kofi@wapi.example.org',
    audience: 'partner',
    topic: 'Evidence-to-Impact Accelerator Co-Design',
    message: 'We would like to explore co-hosting a regional policy research fellowship.',
  };

  const errors = validateInquiryForm(validValues);
  assert.equal(hasValidationErrors(errors), false);
});

test('clampStageIndex keeps indices strictly within bounds', () => {
  assert.equal(clampStageIndex(-2, 10), 0);
  assert.equal(clampStageIndex(0, 10), 0);
  assert.equal(clampStageIndex(5, 10), 5);
  assert.equal(clampStageIndex(14, 10), 9);
  assert.equal(clampStageIndex(3, 0), 0);
});

test('getDefaultTopicForAudience returns matching topic for each audience', () => {
  assert.equal(getDefaultTopicForAudience('innovator'), 'Youth Innovation & Venture Lab');
  assert.equal(getDefaultTopicForAudience('institution'), 'Research & Evidence Services');
  assert.equal(getDefaultTopicForAudience('partner'), 'Evidence-to-Impact Accelerator Co-Design');
});

test('filterAcceleratorStages partitions ten stages across three phases cleanly', () => {
  assert.equal(filterAcceleratorStages(ACCELERATOR_STAGES, 'all').length, 10);
  assert.equal(filterAcceleratorStages(ACCELERATOR_STAGES, 'discovery').length, 3);
  assert.equal(filterAcceleratorStages(ACCELERATOR_STAGES, 'design-policy').length, 4);
  assert.equal(filterAcceleratorStages(ACCELERATOR_STAGES, 'pilot-scale').length, 3);
});

test('ACCELERATOR_PHASE_GROUPS and stage boundary helpers navigate cleanly across phases', () => {
  assert.equal(ACCELERATOR_PHASE_GROUPS.length, 3);
  assert.equal(getPhaseMetaById('design-policy').range, 'Stages 04–07');
  assert.equal(getFirstStageIndexForPhase(ACCELERATOR_STAGES, 'discovery'), 0);
  assert.equal(getFirstStageIndexForPhase(ACCELERATOR_STAGES, 'design-policy'), 3);
  assert.equal(getFirstStageIndexForPhase(ACCELERATOR_STAGES, 'pilot-scale'), 7);
});



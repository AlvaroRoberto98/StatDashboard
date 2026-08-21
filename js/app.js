const DATA_BASE = "data";
const INDEX_URL = `${DATA_BASE}/index.json`;

const state = {
  index: null,
  currentArtifact: null,
  workingArtifact: null,
  selection: null,
  selectedSeries: null,
  selectedFacetKey: null,
  previewZoom: 1,
  previewZoomMode: "manual",
  undoStack: [],
  isUndoing: false
};

const el = {
  zoomOut: document.querySelector("#zoom-out"),
  zoomIn: document.querySelector("#zoom-in"),
  zoomLevel: document.querySelector("#zoom-level"),
  zoomFit: document.querySelector("#zoom-fit"),
  zoomReset: document.querySelector("#zoom-reset"),
  undoEdit: document.querySelector("#undo-edit"),
  saveChanges: document.querySelector("#save-changes"),
  saveTheme: document.querySelector("#save-theme"),
  loadChanges: document.querySelector("#load-changes"),
  loadTheme: document.querySelector("#load-theme"),
  loadChangesFile: document.querySelector("#load-changes-file"),
  loadThemeFile: document.querySelector("#load-theme-file"),
  exportPng: document.querySelector("#export-png"),
  exportSvg: document.querySelector("#export-svg"),
  openTableHtml: document.querySelector("#open-table-html"),
  exportTableHtml: document.querySelector("#export-table-html"),
  previewZoomViewport: document.querySelector("#preview-zoom-viewport"),
  previewZoomStage: document.querySelector("#preview-zoom-stage"),
  project: document.querySelector("#project-select"),
  kind: document.querySelector("#kind-select"),
  artifact: document.querySelector("#artifact-select"),
  version: document.querySelector("#version-select"),
  load: document.querySelector("#load-artifact"),
  reload: document.querySelector("#reload-index"),
  statusDot: document.querySelector("#status-dot"),
  statusText: document.querySelector("#status-text"),
  summaryProject: document.querySelector("#summary-project"),
  summaryArtifact: document.querySelector("#summary-artifact"),
  summaryType: document.querySelector("#summary-type"),
  summaryVersion: document.querySelector("#summary-version"),
  artifactUrl: document.querySelector("#artifact-url"),
  preview: document.querySelector("#json-preview"),
  artifactView: document.querySelector("#artifact-view"),
  artifactViewTitle: document.querySelector("#artifact-view-title"),
  propertiesTitle: document.querySelector("#properties-title"),
  propertiesEmpty: document.querySelector("#properties-empty"),
  rowProperties: document.querySelector("#row-properties"),
  propBold: document.querySelector("#prop-bold"),
  propItalic: document.querySelector("#prop-italic"),
  propFont: document.querySelector("#prop-font"),
  propFontSize: document.querySelector("#prop-font-size"),
  propBorderTop: document.querySelector("#prop-border-top"),
  propBorderBottom: document.querySelector("#prop-border-bottom"),
  propBorderLeft: document.querySelector("#prop-border-left"),
  propBorderRight: document.querySelector("#prop-border-right"),
  propAlign: document.querySelector("#prop-align"),
  propBackground: document.querySelector("#prop-background"),
  propBackgroundReset: document.querySelector("#prop-background-reset"),
  propColor: document.querySelector("#prop-color"),
  propColorReset: document.querySelector("#prop-color-reset"),
  propHiddenRow: document.querySelector("#prop-hidden-row"),
  propHiddenLabel: document.querySelector("#prop-hidden-label"),
  propHidden: document.querySelector("#prop-hidden"),
  tableStructureActions: document.querySelector("#table-structure-actions"),
  deleteRow: document.querySelector("#delete-row"),
  deleteColumn: document.querySelector("#delete-column"),
  resetRowStyle: document.querySelector("#reset-row-style"),
  selectionKind: document.querySelector("#selection-kind"),
  columnNameField: document.querySelector("#column-name-field"),
  propColumnName: document.querySelector("#prop-column-name"),
  cellValueField: document.querySelector("#cell-value-field"),
  propCellValue: document.querySelector("#prop-cell-value"),
  tableTextAccordion: document.querySelector("#table-text-accordion"),
  tableTitle: document.querySelector("#table-title"),
  tableSubtitle: document.querySelector("#table-subtitle"),
  tableNotes: document.querySelector("#table-notes"),
  tableThemeAccordion: document.querySelector("#table-theme-accordion"),
  tableTheme: document.querySelector("#table-theme"),
  tableDensity: document.querySelector("#table-density"),
  tableGlobalFont: document.querySelector("#table-global-font"),
  tableDecimalSeparator: document.querySelector("#table-decimal-separator"),
  tableHeaderBackground: document.querySelector("#table-header-background"),
  tableBorderColor: document.querySelector("#table-border-color"),
  figureProperties: document.querySelector("#figure-properties"),
  figureSelectionKind: document.querySelector("#figure-selection-kind"),
  plotLayerChooser: document.querySelector("#plot-layer-chooser"),
  plotLayerGraph: document.querySelector("#plot-layer-graph"),
  plotLayerMarks: document.querySelector("#plot-layer-marks"),
  figTitle: document.querySelector("#fig-title"),
  figTitleFont: document.querySelector("#fig-title-font"),
  figTitleSize: document.querySelector("#fig-title-size"),
  figTitleColor: document.querySelector("#fig-title-color"),
  figSubtitle: document.querySelector("#fig-subtitle"),
  figXTitle: document.querySelector("#fig-x-title"),
  figXFont: document.querySelector("#fig-x-font"),
  figXColor: document.querySelector("#fig-x-color"),
  figXLineColor: document.querySelector("#fig-x-line-color"),
  figYTitle: document.querySelector("#fig-y-title"),
  figYFont: document.querySelector("#fig-y-font"),
  figYColor: document.querySelector("#fig-y-color"),
  figYLineColor: document.querySelector("#fig-y-line-color"),
  figXMin: document.querySelector("#fig-x-min"),
  figXMax: document.querySelector("#fig-x-max"),
  figYMin: document.querySelector("#fig-y-min"),
  figYMax: document.querySelector("#fig-y-max"),
  graphGeneralAccordion: document.querySelector("#graph-general-accordion"),
  figTheme: document.querySelector("#fig-theme"),
  figGlobalFont: document.querySelector("#fig-global-font"),
  figBackgroundColor: document.querySelector("#fig-background-color"),
  figPlotBackgroundColor: document.querySelector("#fig-plot-background-color"),
  figGridColor: document.querySelector("#fig-grid-color"),
  figHeight: document.querySelector("#fig-height"),
  figPointSize: document.querySelector("#fig-point-size"),
  figOpacity: document.querySelector("#fig-opacity"),
  figLegendVisible: document.querySelector("#fig-legend-visible"),
  figLegendTitle: document.querySelector("#fig-legend-title"),
  figLegendPosition: document.querySelector("#fig-legend-position"),
  figLegendTheme: document.querySelector("#fig-legend-theme"),
  legendItemsSection: document.querySelector("#legend-items-section"),
  legendItemsEditor: document.querySelector("#legend-items-editor"),
  seriesBrowserSection: document.querySelector("#series-browser-section"),
  seriesBrowser: document.querySelector("#series-browser"),
  seriesEditorSection: document.querySelector("#series-editor-section"),
  seriesName: document.querySelector("#series-name"),
  seriesColor: document.querySelector("#series-color"),
  seriesOpacity: document.querySelector("#series-opacity"),
  seriesLineWidth: document.querySelector("#series-line-width"),
  seriesLineWidthField: document.querySelector("#series-line-width-field"),
  seriesFillVisible: document.querySelector("#series-fill-visible"),
  seriesFillField: document.querySelector("#series-fill-field"),
  scatterSeriesControls: document.querySelector("#scatter-series-controls"),
  seriesPointSize: document.querySelector("#series-point-size"),
  seriesPointShape: document.querySelector("#series-point-shape"),
  facetOverrideControls: document.querySelector("#facet-override-controls"),
  facetPanelButtons: document.querySelector("#facet-panel-buttons"),
  selectedFacetName: document.querySelector("#selected-facet-name"),
  facetPanelColor: document.querySelector("#facet-panel-color"),
  facetPanelClear: document.querySelector("#facet-panel-clear"),
  facetTitleField: document.querySelector("#facet-title-field"),
  facetTitleValue: document.querySelector("#facet-title-value"),
  facetControls: document.querySelector("#facet-controls"),
  figFacetColumns: document.querySelector("#fig-facet-columns"),
  figFacetWidth: document.querySelector("#fig-facet-width"),
  figFacetHeight: document.querySelector("#fig-facet-height"),
  resetFigureStyle: document.querySelector("#reset-figure-style")
};


const PREVIEW_ZOOM_STEPS = [
  0.50,
  0.60,
  0.75,
  0.85,
  1.00,
  1.15,
  1.25,
  1.50
];

function nearestZoomStep(value) {
  return PREVIEW_ZOOM_STEPS.reduce(
    (best, step) =>
      Math.abs(step - value) <
      Math.abs(best - value)
        ? step
        : best,
    PREVIEW_ZOOM_STEPS[0]
  );
}

function updateZoomSelect(scale) {
  if (!el.zoomLevel) return;

  const exact = PREVIEW_ZOOM_STEPS.find(
    step => Math.abs(step - scale) < 0.001
  );

  if (exact) {
    el.zoomLevel.value =
      exact.toFixed(2);
  }
}

function applyPreviewZoom(
  scale,
  mode = "manual"
) {
  if (
    !el.previewZoomStage ||
    !el.previewZoomViewport
  ) {
    return;
  }

  const safeScale =
    Math.min(
      2,
      Math.max(
        0.25,
        Number(scale) || 1
      )
    );

  state.previewZoom =
    safeScale;
  state.previewZoomMode =
    mode;

  el.previewZoomStage.style.transform =
    `scale(${safeScale})`;

  /*
   * CSS transform não altera o espaço de layout.
   * Compensamos largura/altura para evitar uma área vazia enorme.
   */
  el.previewZoomStage.style.marginBottom =
    `${Math.max(
      0,
      el.previewZoomStage.scrollHeight *
      (safeScale - 1)
    )}px`;

  if (safeScale < 1) {
    el.previewZoomStage.style.width =
      `${100 / safeScale}%`;
  } else {
    el.previewZoomStage.style.width =
      "max-content";
  }

  el.previewZoomViewport.classList.toggle(
    "fit-width",
    mode === "fit"
  );

  updateZoomSelect(safeScale);
}

function resetPreviewZoom() {
  applyPreviewZoom(1, "manual");

  if (el.zoomLevel) {
    el.zoomLevel.value = "1.00";
  }
}

function fitPreviewToWidth() {
  if (
    !el.previewZoomViewport ||
    !el.previewZoomStage
  ) {
    return;
  }

  /*
   * Primeiro mede em 100% para descobrir o tamanho natural.
   */
  el.previewZoomStage.style.transform =
    "scale(1)";
  el.previewZoomStage.style.width =
    "max-content";

  requestAnimationFrame(() => {
    const available =
      el.previewZoomViewport.clientWidth;

    const artifact =
      el.artifactView;

    if (!artifact || !available) {
      return;
    }

    const naturalWidth =
      Math.max(
        artifact.scrollWidth,
        artifact.getBoundingClientRect().width
      );

    if (!naturalWidth) {
      return;
    }

    const scale =
      Math.min(
        1,
        available / naturalWidth
      );

    applyPreviewZoom(
      Math.max(0.25, scale),
      "fit"
    );
  });
}

function stepPreviewZoom(direction) {
  const current =
    state.previewZoom ?? 1;

  let index =
    PREVIEW_ZOOM_STEPS.findIndex(
      step =>
        Math.abs(step - current) < 0.001
    );

  if (index === -1) {
    const nearest =
      nearestZoomStep(current);

    index =
      PREVIEW_ZOOM_STEPS.indexOf(nearest);
  }

  const nextIndex =
    Math.min(
      PREVIEW_ZOOM_STEPS.length - 1,
      Math.max(
        0,
        index + direction
      )
    );

  applyPreviewZoom(
    PREVIEW_ZOOM_STEPS[nextIndex],
    "manual"
  );
}

function setStatus(type, text) {
  el.statusDot.className = "status-dot";

  if (type) {
    el.statusDot.classList.add(type);
  }

  el.statusText.textContent = text;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ao carregar ${url}`
    );
  }

  return response.json();
}

function getProjects() {
  return Array.isArray(state.index?.projects)
    ? state.index.projects
    : [];
}

function getSelectedProject() {
  return getProjects().find(
    project => project.project_id === el.project.value
  );
}

function getArtifactCollection(project, kind) {
  if (!project) return [];

  return kind === "table"
    ? (project.tables ?? [])
    : (project.figures ?? []);
}

function fillProjects() {
  const projects = getProjects();

  el.project.innerHTML = projects
    .map(project => {
      const label =
        `[${project.project_id}] ${project.project_name}`;

      return `<option value="${escapeHtml(project.project_id)}">${escapeHtml(label)}</option>`;
    })
    .join("");

  fillArtifacts();
}

function fillArtifacts() {
  const project = getSelectedProject();
  const artifacts = getArtifactCollection(
    project,
    el.kind.value
  );

  if (!artifacts.length) {
    el.artifact.innerHTML =
      `<option value="">Nenhum artefato disponível</option>`;
    el.version.innerHTML =
      `<option value="">—</option>`;
    return;
  }

  el.artifact.innerHTML = artifacts
    .map(artifact => {
      const title = artifact.title
        ? ` — ${artifact.title}`
        : "";

      return `<option value="${escapeHtml(artifact.id)}">${escapeHtml(artifact.id + title)}</option>`;
    })
    .join("");

  fillVersions();
}

function getSelectedArtifact() {
  const project = getSelectedProject();

  return getArtifactCollection(
    project,
    el.kind.value
  ).find(
    artifact => artifact.id === el.artifact.value
  );
}

function fillVersions() {
  const artifact = getSelectedArtifact();

  const versions = Array.isArray(artifact?.versions)
    ? artifact.versions
    : (
        Number.isFinite(artifact?.latest_version)
          ? [artifact.latest_version]
          : []
      );

  const ordered = [...versions].sort(
    (a, b) => Number(b) - Number(a)
  );

  el.version.innerHTML = ordered
    .map(version => {
      return `<option value="${Number(version)}">v${String(version).padStart(3, "0")}</option>`;
    })
    .join("");
}

function buildArtifactUrl() {
  const project = getSelectedProject();
  const artifact = getSelectedArtifact();
  const version = Number(el.version.value);

  if (!project || !artifact || !Number.isFinite(version)) {
    throw new Error(
      "Projeto, artefato ou versão inválidos."
    );
  }

  const folder =
    el.kind.value === "table"
      ? "tables"
      : "figures";

  const versionFile =
    `v${String(version).padStart(3, "0")}.json`;

  return (
    `${DATA_BASE}/projects/` +
    `${encodeURIComponent(project.project_id)}/` +
    `${folder}/` +
    `${encodeURIComponent(artifact.id)}/` +
    versionFile
  );
}

function unwrapArtifact(raw) {
  if (raw && typeof raw === "object" && raw.content) {
    return {
      storage: raw,
      content: raw.content
    };
  }

  return {
    storage: null,
    content: raw
  };
}

function normalizeColumn(column, index) {
  if (typeof column === "string") {
    return {
      id: column,
      name: column
    };
  }

  const id =
    column?.id ??
    column?.key ??
    column?.field ??
    `col_${index + 1}`;

  const name =
    column?.name ??
    column?.label ??
    column?.title ??
    id;

  return {
    ...column,
    id: String(id),
    name: String(name)
  };
}

function normalizeColumns(content) {
  const source =
    content?.columns ??
    content?.headers ??
    content?.column_definitions ??
    [];

  if (Array.isArray(source) && source.length) {
    return source.map(normalizeColumn);
  }

  const firstRow = Array.isArray(content?.rows)
    ? content.rows[0]
    : null;

  if (firstRow && typeof firstRow === "object") {
    const ignored = new Set([
      "id",
      "row_id",
      "level",
      "type",
      "children",
      "subrows",
      "visible"
    ]);

    return Object.keys(firstRow)
      .filter(key => !ignored.has(key))
      .map((key, index) => normalizeColumn(key, index));
  }

  return [];
}

function getCellValue(row, column, index) {
  if (!row || typeof row !== "object") {
    return "";
  }

  if (row.values && typeof row.values === "object") {
    if (Array.isArray(row.values)) {
      return row.values[index] ?? "";
    }

    if (column.id in row.values) {
      return row.values[column.id];
    }
  }

  if (row.cells && typeof row.cells === "object") {
    if (Array.isArray(row.cells)) {
      const cell = row.cells[index];

      if (cell && typeof cell === "object") {
        return (
          cell.value ??
          cell.text ??
          cell.display ??
          ""
        );
      }

      return cell ?? "";
    }

    if (column.id in row.cells) {
      const cell = row.cells[column.id];

      if (cell && typeof cell === "object") {
        return (
          cell.value ??
          cell.text ??
          cell.display ??
          ""
        );
      }

      return cell ?? "";
    }
  }

  if (column.id in row) {
    const value = row[column.id];

    if (value && typeof value === "object") {
      return (
        value.value ??
        value.text ??
        value.display ??
        ""
      );
    }

    return value ?? "";
  }

  if (index === 0) {
    return (
      row.label ??
      row.parameter ??
      row.variable ??
      row.name ??
      row.title ??
      ""
    );
  }

  return "";
}

function flattenRows(rows, depth = 0, path = "") {
  if (!Array.isArray(rows)) {
    return [];
  }

  const result = [];

  rows.forEach((row, index) => {
    if (!row || typeof row !== "object") {
      return;
    }

    const indexPath =
      path
        ? `${path}_${index + 1}`
        : `${index + 1}`;

    result.push({
      ...row,
      __depth: depth,
      __rowId: getRowId(row, indexPath)
    });

    const children =
      row.children ??
      row.subrows ??
      row.rows;

    if (Array.isArray(children)) {
      result.push(
        ...flattenRows(
          children,
          depth + 1,
          indexPath
        )
      );
    }
  });

  return result;
}

function normalizeFootnotes(content) {
  const source =
    content?.footnotes ??
    content?.notes ??
    content?.table_notes ??
    [];

  if (typeof source === "string") {
    return [
      {
        id: null,
        text: source
      }
    ];
  }

  if (!Array.isArray(source)) {
    return [];
  }

  return source.map((note, index) => {
    if (typeof note === "string") {
      return {
        id: null,
        text: note
      };
    }

    return {
      id:
        note?.id ??
        note?.marker ??
        note?.symbol ??
        null,
      text:
        note?.text ??
        note?.note ??
        note?.content ??
        `Nota ${index + 1}`
    };
  });
}

function isSectionRow(row) {
  return (
    row?.type === "section" ||
    row?.is_section === true ||
    row?.section === true
  );
}


function applyDecimalSeparatorToDisplay(value, separator) {
  const text =
    String(value ?? "");

  if (
    separator !== "comma" &&
    separator !== "dot"
  ) {
    return text;
  }

  /*
   * Só troca pontuação que esteja entre dígitos.
   *
   * Exemplos:
   * 52,10 -> 52.10
   * 66,7% -> 66.7%
   * R$ 209,55 -> R$ 209.55
   *
   * Mas:
   * Sexo, n (%) -> continua igual
   */
  if (separator === "dot") {
    return text.replace(
      /(\d),(\d)/g,
      "$1.$2"
    );
  }

  return text.replace(
    /(\d)\.(\d)/g,
    "$1,$2"
  );
}

function formatCellForTable(value, content) {
  const base =
    formatCell(value);

  const separator =
    content?.table_appearance
      ?.decimal_separator ??
    "original";

  return applyDecimalSeparatorToDisplay(
    base,
    separator
  );
}

function formatCell(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return (
      value.display ??
      value.text ??
      value.value ??
      JSON.stringify(value)
    );
  }

  return String(value);
}


function normalizeStyle(style) {
  if (!style || typeof style !== "object") {
    return {};
  }

  const normalized = {};

  const booleanKeys = [
    "bold",
    "italic",
    "border_top",
    "border_bottom",
    "border_left",
    "border_right"
  ];

  booleanKeys.forEach(key => {
    if (
      Object.prototype.hasOwnProperty.call(style, key) &&
      typeof style[key] === "boolean"
    ) {
      normalized[key] = style[key];
    }
  });

  if (
    Object.prototype.hasOwnProperty.call(style, "align") &&
    ["left", "center", "right"].includes(style.align)
  ) {
    normalized.align = style.align;
  }

  if (
    typeof style.background === "string" &&
    style.background.trim()
  ) {
    normalized.background =
      style.background.trim();
  }

  if (
    typeof style.color === "string" &&
    style.color.trim()
  ) {
    normalized.color =
      style.color.trim();
  }

  if (
    typeof style.font === "string" &&
    style.font.trim()
  ) {
    normalized.font =
      style.font.trim();
  }

  const fontSize =
    Number(style.font_size);

  if (
    Number.isFinite(fontSize) &&
    fontSize > 0
  ) {
    normalized.font_size =
      fontSize;
  }

  return normalized;
}

function mergeStyles(...styles) {
  const merged = {};

  for (const style of styles) {
    const normalized =
      normalizeStyle(style);

    Object.assign(
      merged,
      normalized
    );
  }

  return merged;
}

function getCellObject(row, column, index) {
  if (!row || typeof row !== "object") {
    return null;
  }

  if (row.cells && typeof row.cells === "object") {
    if (Array.isArray(row.cells)) {
      return row.cells[index] ?? null;
    }

    if (column.id in row.cells) {
      return row.cells[column.id];
    }
  }

  if (row.values && typeof row.values === "object") {
    if (Array.isArray(row.values)) {
      return row.values[index] ?? null;
    }

    if (column.id in row.values) {
      return row.values[column.id];
    }
  }

  if (column.id in row) {
    return row[column.id];
  }

  return null;
}

function styleToInlineCss(style) {
  const parts = [];

  if (style.background) {
    parts.push(`background:${escapeAttribute(style.background)}`);
  }

  if (style.color) {
    parts.push(`color:${escapeAttribute(style.color)}`);
  }

  if (style.font) {
    parts.push(`font-family:${escapeAttribute(style.font)}`);
  }

  if (style.font_size) {
    parts.push(`font-size:${escapeAttribute(style.font_size)}px`);
  }

  return parts.join(";");
}

function styleToRowAttributes(style) {
  const attrs = [];

  if (style.bold === true) {
    attrs.push('data-bold="true"');
  } else if (style.bold === false) {
    attrs.push('data-bold="false"');
  }

  if (style.italic === true) {
    attrs.push('data-italic="true"');
  } else if (style.italic === false) {
    attrs.push('data-italic="false"');
  }

  if (style.border_top === true) {
    attrs.push('data-border-top="true"');
  }

  if (style.border_bottom === true) {
    attrs.push('data-border-bottom="true"');
  }

  if (style.border_left === true) {
    attrs.push('data-border-left="true"');
  }

  if (style.border_right === true) {
    attrs.push('data-border-right="true"');
  }

  if (style.align) {
    attrs.push(
      `data-align="${escapeAttribute(style.align)}"`
    );
  }

  const inlineCss =
    styleToInlineCss(style);

  if (inlineCss) {
    attrs.push(
      `style="${inlineCss}"`
    );
  }

  return attrs.join(" ");
}

function styleToCellClasses(style) {
  const classes = [];

  if (style.bold === true) {
    classes.push("cell-bold");
  } else if (style.bold === false) {
    classes.push("cell-not-bold");
  }

  if (style.italic === true) {
    classes.push("cell-italic");
  } else if (style.italic === false) {
    classes.push("cell-not-italic");
  }

  if (style.border_top === true) {
    classes.push("cell-border-top");
  }

  if (style.border_bottom === true) {
    classes.push("cell-border-bottom");
  }

  if (style.border_left === true) {
    classes.push("cell-border-left");
  }

  if (style.border_right === true) {
    classes.push("cell-border-right");
  }

  if (style.align) {
    classes.push(
      `cell-align-${style.align}`
    );
  }

  return classes;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}


function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getWorkingContent() {
  return unwrapArtifact(state.workingArtifact)?.content ?? null;
}

function getEditableRows() {
  const content = getWorkingContent();

  if (!content) return [];

  return content.rows ?? content.data ?? [];
}

function findRowById(rows, rowId) {
  if (!Array.isArray(rows)) return null;

  for (const row of rows) {
    if (!row || typeof row !== "object") continue;

    const id =
      row.id ??
      row.row_id ??
      row.key ??
      null;

    if (String(id) === String(rowId)) {
      return row;
    }

    const children =
      row.children ??
      row.subrows ??
      row.rows;

    const nested = findRowById(children, rowId);

    if (nested) return nested;
  }

  return null;
}

function getRowId(row, indexPath) {
  return String(
    row?.id ??
    row?.row_id ??
    row?.key ??
    `row_${indexPath}`
  );
}


function getContentRows() {
  return getEditableRows();
}

function getContentColumns() {
  const content = getWorkingContent();
  return normalizeColumns(content);
}

function getRowLabel(row, fallback) {
  const raw =
    row?.label ??
    row?.parameter ??
    row?.variable ??
    row?.name ??
    row?.title ??
    row?.cells?.componente ??
    fallback;

  if (raw && typeof raw === "object") {
    return raw.value ?? raw.text ?? raw.display ?? fallback;
  }

  return raw;
}

function getRawColumnSource() {
  const content = getWorkingContent();
  if (!content) return [];

  return (
    content.columns ??
    content.headers ??
    content.column_definitions ??
    []
  );
}

function getEditableColumn(columnId) {
  const cols = getRawColumnSource();

  if (!Array.isArray(cols)) return null;

  return cols.find((col, index) => {
    const normalized = normalizeColumn(col, index);
    return String(normalized.id) === String(columnId);
  }) ?? null;
}

function getEditableCell(row, columnId) {
  if (!row || typeof row !== "object") return null;

  if (!row.cells || typeof row.cells !== "object") {
    row.cells = {};
  }

  if (Array.isArray(row.cells)) {
    return null;
  }

  const current = row.cells[columnId];

  if (
    current &&
    typeof current === "object" &&
    !Array.isArray(current)
  ) {
    return current;
  }

  row.cells[columnId] = {
    value: current ?? getCellValue(
      row,
      { id: columnId },
      0
    )
  };

  return row.cells[columnId];
}


function getWorkingKind() {
  const content =
    getWorkingContent();

  const storageKind =
    state.workingArtifact?.artifact?.kind;

  return (
    storageKind ??
    content?.kind ??
    (
      content?.type === "table"
        ? "table"
        : "figure"
    )
  );
}

function enforceEditorContext(kind) {
  const isTable =
    kind === "table";

  if (isTable) {
    el.figureProperties.hidden = true;
    el.figureProperties.style.display = "none";
    el.figureProperties.classList.add("force-hidden");

    if (el.plotLayerChooser) {
      el.plotLayerChooser.hidden = true;
      el.plotLayerChooser.style.display = "none";
    }
  } else {
    el.figureProperties.style.display = "";
    el.figureProperties.classList.remove("force-hidden");
  }
}


function removeRowById(rows, rowId) {
  if (!Array.isArray(rows)) {
    return false;
  }

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];

    if (!row || typeof row !== "object") {
      continue;
    }

    const id =
      row.id ??
      row.row_id ??
      row.key ??
      null;

    if (String(id) === String(rowId)) {
      rows.splice(i, 1);
      return true;
    }

    const children =
      row.children ??
      row.subrows ??
      row.rows;

    if (
      Array.isArray(children) &&
      removeRowById(children, rowId)
    ) {
      return true;
    }
  }

  return false;
}

function removeColumnById(content, columnId) {
  if (!content || typeof content !== "object") {
    return false;
  }

  const source =
    content.columns ??
    content.headers ??
    content.column_definitions;

  if (!Array.isArray(source)) {
    return false;
  }

  const index = source.findIndex((column, i) => {
    const normalized =
      normalizeColumn(column, i);

    return (
      String(normalized.id) ===
      String(columnId)
    );
  });

  if (index < 0) {
    return false;
  }

  source.splice(index, 1);

  /*
   * Remove também o conteúdo daquela coluna das linhas,
   * preservando os demais campos.
   */
  const cleanRows = rows => {
    if (!Array.isArray(rows)) return;

    rows.forEach(row => {
      if (!row || typeof row !== "object") return;

      if (
        row.cells &&
        typeof row.cells === "object" &&
        !Array.isArray(row.cells)
      ) {
        delete row.cells[columnId];
      }

      if (
        row.values &&
        typeof row.values === "object" &&
        !Array.isArray(row.values)
      ) {
        delete row.values[columnId];
      }

      if (
        Object.prototype.hasOwnProperty.call(
          row,
          columnId
        )
      ) {
        delete row[columnId];
      }

      const children =
        row.children ??
        row.subrows ??
        row.rows;

      cleanRows(children);
    });
  };

  cleanRows(
    content.rows ??
    content.data ??
    []
  );

  return true;
}

function updateTableStructureActions(selection) {
  if (!el.tableStructureActions) return;

  const isRow =
    selection?.type === "row";

  const isColumn =
    selection?.type === "column";

  el.tableStructureActions.hidden =
    !isRow && !isColumn;

  el.deleteRow.hidden =
    !isRow;

  el.deleteColumn.hidden =
    !isColumn;
}


function sanitizeFilenamePart(value, fallback = "artifact") {
  const text =
    String(value ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return text || fallback;
}

function downloadJsonObject(object, filename) {
  const blob =
    new Blob(
      [
        JSON.stringify(
          object,
          null,
          2
        )
      ],
      {
        type:
          "application/json;charset=utf-8"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(
    () => URL.revokeObjectURL(url),
    1000
  );
}

function getArtifactIdentity() {
  const storage =
    state.workingArtifact ?? {};

  const content =
    getWorkingContent() ?? {};

  const kind =
    storage?.artifact?.kind ??
    (
      content?.type === "table"
        ? "table"
        : "figure"
    );

  const id =
    storage?.artifact?.id ??
    getSelectedArtifact()?.id ??
    (
      kind === "table"
        ? "table"
        : "figure"
    );

  return {
    kind,
    id,
    type:
      content?.type ??
      kind
  };
}

function collectSeriesPalette(content) {
  const styles =
    content?.series_styles;

  if (
    !styles ||
    typeof styles !== "object"
  ) {
    return [];
  }

  const palette = [];

  Object.values(styles).forEach(
    fieldStyles => {
      if (
        !fieldStyles ||
        typeof fieldStyles !== "object"
      ) {
        return;
      }

      Object.values(fieldStyles).forEach(
        style => {
          const color =
            style?.color;

          if (
            typeof color === "string" &&
            color &&
            !palette.includes(color)
          ) {
            palette.push(color);
          }
        }
      );
    }
  );

  return palette;
}

function pickObject(source, keys) {
  const result = {};

  keys.forEach(key => {
    if (
      source &&
      Object.prototype.hasOwnProperty.call(
        source,
        key
      )
    ) {
      result[key] =
        deepClone(source[key]);
    }
  });

  return result;
}

function buildTableTheme(content) {
  return {
    theme_format_version: "1.0",
    kind: "table",
    common: {
      table_appearance:
        deepClone(
          content?.table_appearance ??
          {}
        ),
      style:
        deepClone(
          content?.style ??
          content?.table_style ??
          {}
        )
    }
  };
}

function buildFigureTheme(content) {
  const type =
    content?.type ??
    "figure";

  const p =
    content?.parameters ??
    {};

  /*
   * Propriedades universais:
   * não incluem textos, dados, títulos de eixo,
   * mínimos/máximos ou nomes de séries.
   */
  const common = {
    appearance:
      deepClone(
        content?.appearance ??
        {}
      ),
    legend: {
      position:
        content?.legend?.position,
      theme:
        content?.legend?.theme
    },
    show_legend:
      p.show_legend,
    series_palette:
      collectSeriesPalette(content)
  };

  Object.keys(common.legend)
    .forEach(key => {
      if (
        common.legend[key] ===
        undefined
      ) {
        delete common.legend[key];
      }
    });

  if (
    common.show_legend ===
    undefined
  ) {
    delete common.show_legend;
  }

  const specificKeysByType = {
    density: [
      "alpha",
      "opacity",
      "line_width",
      "show_line",
      "density_padding_ratio",
      "density_steps"
    ],
    scatter: [
      "size",
      "opacity"
    ],
    faceted_scatter: [
      "size",
      "opacity",
      "facet_columns",
      "facet_width",
      "facet_height"
    ],
    boxplot: [
      "width",
      "opacity",
      "alpha",
      "extent"
    ],
    stacked_bar_percent: [
      "width",
      "opacity"
    ],
    histogram: [
      "bins",
      "opacity"
    ],
    pie: [
      "opacity",
      "inner_radius",
      "outer_radius"
    ]
  };

  const specific = {
    type,
    parameters:
      pickObject(
        p,
        specificKeysByType[type] ?? []
      )
  };

  return {
    theme_format_version: "1.0",
    kind: "figure",
    common,
    specific
  };
}

function buildThemeForCurrentArtifact() {
  const content =
    getWorkingContent();

  if (!content) {
    throw new Error(
      "Nenhum artefato carregado."
    );
  }

  const identity =
    getArtifactIdentity();

  if (identity.kind === "table") {
    return buildTableTheme(content);
  }

  return buildFigureTheme(content);
}

function saveCurrentChanges() {
  if (!state.workingArtifact) {
    setStatus(
      "error",
      "Nenhum artefato carregado para salvar."
    );
    return;
  }

  const identity =
    getArtifactIdentity();

  const filename =
    `${sanitizeFilenamePart(identity.id)}-editado.json`;

  downloadJsonObject(
    state.workingArtifact,
    filename
  );

  setStatus(
    "ok",
    `Alterações salvas em ${filename}.`
  );
}

function saveCurrentTheme() {
  try {
    const identity =
      getArtifactIdentity();

    const theme =
      buildThemeForCurrentArtifact();

    const typePart =
      identity.kind === "figure"
        ? `-${sanitizeFilenamePart(identity.type)}`
        : "";

    const filename =
      `theme-${identity.kind}${typePart}.json`;

    downloadJsonObject(
      theme,
      filename
    );

    setStatus(
      "ok",
      `Tema salvo em ${filename}.`
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      error.message
    );
  }
}


async function readJsonFile(file) {
  const text = await file.text();

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      "O arquivo selecionado não contém JSON válido."
    );
  }
}

function mergeThemeObject(target, source) {
  if (
    !source ||
    typeof source !== "object" ||
    Array.isArray(source)
  ) {
    return;
  }

  Object.entries(source).forEach(
    ([key, value]) => {
      if (value === undefined) return;

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        if (
          !target[key] ||
          typeof target[key] !== "object" ||
          Array.isArray(target[key])
        ) {
          target[key] = {};
        }

        mergeThemeObject(
          target[key],
          value
        );
      } else {
        target[key] =
          deepClone(value);
      }
    }
  );
}

function applyPaletteToFigure(content, palette) {
  if (
    !Array.isArray(palette) ||
    !palette.length
  ) {
    return;
  }

  const styles =
    content.series_styles;

  if (
    !styles ||
    typeof styles !== "object"
  ) {
    return;
  }

  let index = 0;

  Object.values(styles).forEach(
    fieldStyles => {
      if (
        !fieldStyles ||
        typeof fieldStyles !== "object"
      ) return;

      Object.values(fieldStyles).forEach(
        style => {
          if (
            style &&
            typeof style === "object"
          ) {
            style.color =
              palette[
                index %
                palette.length
              ];

            index += 1;
          }
        }
      );
    }
  );
}

function applyTableTheme(theme, content) {
  const common =
    theme.common ?? {};

  if (common.table_appearance) {
    content.table_appearance ??= {};

    mergeThemeObject(
      content.table_appearance,
      common.table_appearance
    );
  }

  if (common.style) {
    content.style ??= {};

    mergeThemeObject(
      content.style,
      common.style
    );
  }
}

function applyFigureTheme(theme, content) {
  const common =
    theme.common ?? {};

  if (common.appearance) {
    content.appearance ??= {};

    mergeThemeObject(
      content.appearance,
      common.appearance
    );
  }

  if (common.legend) {
    content.legend ??= {};

    mergeThemeObject(
      content.legend,
      common.legend
    );
  }

  if (
    common.show_legend !==
    undefined
  ) {
    content.parameters ??= {};
    content.parameters.show_legend =
      common.show_legend;
  }

  applyPaletteToFigure(
    content,
    common.series_palette
  );

  /*
   * Parâmetros específicos só são aplicados
   * quando o tema e o gráfico são do mesmo tipo.
   */
  if (
    theme.specific?.type &&
    theme.specific.type ===
      content.type &&
    theme.specific.parameters
  ) {
    content.parameters ??= {};

    mergeThemeObject(
      content.parameters,
      theme.specific.parameters
    );
  }
}

function applyThemeToCurrentArtifact(theme) {
  if (
    !theme ||
    typeof theme !== "object"
  ) {
    throw new Error(
      "Tema inválido."
    );
  }

  if (
    theme.theme_format_version !==
    "1.0"
  ) {
    throw new Error(
      "Este arquivo não é um tema compatível com o editor."
    );
  }

  const content =
    getWorkingContent();

  if (!content) {
    throw new Error(
      "Carregue um artefato antes de aplicar o tema."
    );
  }

  const identity =
    getArtifactIdentity();

  if (
    theme.kind !==
    identity.kind
  ) {
    throw new Error(
      theme.kind === "table"
        ? "Este tema é de tabela, mas o artefato atual é um gráfico."
        : "Este tema é de gráfico, mas o artefato atual é uma tabela."
    );
  }

  pushUndoSnapshot();

  if (theme.kind === "table") {
    applyTableTheme(
      theme,
      content
    );
  } else {
    applyFigureTheme(
      theme,
      content
    );
  }

  state.selection = null;
  clearSelection();

  setStatus(
    "ok",
    theme.kind === "figure" &&
    theme.specific?.type &&
    theme.specific.type !==
      content.type
      ? `Tema aplicado. A aparência geral foi carregada; propriedades específicas de ${theme.specific.type} foram ignoradas porque o gráfico atual é ${content.type}.`
      : "Tema aplicado ao artefato atual."
  );
}

async function loadSavedChangesFile(file) {
  const artifact =
    await readJsonFile(file);

  if (
    !artifact ||
    typeof artifact !== "object" ||
    !artifact.artifact ||
    !artifact.content
  ) {
    throw new Error(
      "Este JSON não parece ser um artefato Contract V2 completo."
    );
  }

  /*
   * Carregar alterações inicia uma nova sessão de edição
   * daquele estado salvo.
   */
  state.workingArtifact =
    deepClone(artifact);

  state.currentArtifact =
    deepClone(artifact);

  resetUndoHistory();

  state.selection = null;
  state.selectedSeries = null;
  state.selectedFacetKey = null;

  clearSelection();

  setStatus(
    "ok",
    `Alterações carregadas de ${file.name}.`
  );
}


function isCurrentArtifactFigure() {
  const identity =
    getArtifactIdentity();

  return identity.kind === "figure";
}

function getCurrentVegaView() {
  const container =
    el.artifactView
      ?.querySelector(".vega-embed");

  if (!container) {
    return null;
  }

  const view =
    container.__vega_view__ ??
    container.__view__ ??
    null;

  return view;
}

function findVegaCanvas() {
  return (
    el.artifactView
      ?.querySelector(".vega-embed canvas") ??
    el.artifactView
      ?.querySelector("canvas")
  );
}

function findVegaSvg() {
  return (
    el.artifactView
      ?.querySelector(".vega-embed svg") ??
    el.artifactView
      ?.querySelector("svg")
  );
}

function downloadBlob(blob, filename) {
  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(
    () => URL.revokeObjectURL(url),
    1000
  );
}

function currentFigureFilename(extension) {
  const identity =
    getArtifactIdentity();

  return (
    `${sanitizeFilenamePart(identity.id, "figure")}.` +
    extension
  );
}

async function exportFigurePng() {
  if (!isCurrentArtifactFigure()) {
    setStatus(
      "error",
      "A exportação PNG desta etapa é apenas para gráficos."
    );
    return;
  }

  try {
    /*
     * Preferimos o canvas já renderizado pelo Vega.
     * O zoom da interface é feito por CSS no container externo,
     * portanto não altera os pixels internos do canvas.
     */
    const canvas =
      findVegaCanvas();

    if (canvas) {
      const blob =
        await new Promise(resolve =>
          canvas.toBlob(
            resolve,
            "image/png",
            1
          )
        );

      if (!blob) {
        throw new Error(
          "Não foi possível gerar o PNG."
        );
      }

      downloadBlob(
        blob,
        currentFigureFilename("png")
      );

      setStatus(
        "ok",
        "Gráfico exportado em PNG."
      );

      return;
    }

    /*
     * Fallback para SVG -> imagem -> canvas.
     */
    const svg =
      findVegaSvg();

    if (!svg) {
      throw new Error(
        "Não encontrei a renderização do gráfico."
      );
    }

    const cloned =
      svg.cloneNode(true);

    const serializer =
      new XMLSerializer();

    const svgText =
      serializer.serializeToString(
        cloned
      );

    const svgBlob =
      new Blob(
        [svgText],
        {
          type:
            "image/svg+xml;charset=utf-8"
        }
      );

    const url =
      URL.createObjectURL(svgBlob);

    const image =
      new Image();

    await new Promise(
      (resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
      }
    );

    const box =
      svg.getBoundingClientRect();

    const width =
      Number(
        svg.getAttribute("width")
      ) ||
      Math.round(box.width) ||
      1200;

    const height =
      Number(
        svg.getAttribute("height")
      ) ||
      Math.round(box.height) ||
      800;

    const canvasFallback =
      document.createElement("canvas");

    const scale = 2;

    canvasFallback.width =
      Math.max(1, width * scale);

    canvasFallback.height =
      Math.max(1, height * scale);

    const ctx =
      canvasFallback.getContext("2d");

    ctx.scale(scale, scale);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      0,
      0,
      width,
      height
    );

    ctx.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    URL.revokeObjectURL(url);

    const pngBlob =
      await new Promise(resolve =>
        canvasFallback.toBlob(
          resolve,
          "image/png",
          1
        )
      );

    if (!pngBlob) {
      throw new Error(
        "Não foi possível gerar o PNG."
      );
    }

    downloadBlob(
      pngBlob,
      currentFigureFilename("png")
    );

    setStatus(
      "ok",
      "Gráfico exportado em PNG."
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      `Falha ao exportar PNG: ${error.message}`
    );
  }
}

function exportFigureSvg() {
  if (!isCurrentArtifactFigure()) {
    setStatus(
      "error",
      "A exportação SVG desta etapa é apenas para gráficos."
    );
    return;
  }

  try {
    const svg =
      findVegaSvg();

    if (!svg) {
      throw new Error(
        "Este gráfico foi renderizado em canvas e não possui SVG disponível."
      );
    }

    const cloned =
      svg.cloneNode(true);

    if (
      !cloned.getAttribute("xmlns")
    ) {
      cloned.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg"
      );
    }

    const serializer =
      new XMLSerializer();

    const svgText =
      serializer.serializeToString(
        cloned
      );

    const blob =
      new Blob(
        [svgText],
        {
          type:
            "image/svg+xml;charset=utf-8"
        }
      );

    downloadBlob(
      blob,
      currentFigureFilename("svg")
    );

    setStatus(
      "ok",
      "Gráfico exportado em SVG."
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      `Falha ao exportar SVG: ${error.message}`
    );
  }
}


function isCurrentArtifactTable() {
  const identity =
    getArtifactIdentity();

  return identity.kind === "table";
}

function buildCleanTableClone() {
  const source =
    el.artifactView;

  if (!source) {
    throw new Error(
      "A tabela não está renderizada."
    );
  }

  const root =
    document.createElement("div");

  root.className =
    "export-table-content";

  /*
   * Exportamos apenas os elementos finais.
   * O container artifact-view não entra porque possui regras
   * próprias do dashboard (largura, overflow, posicionamento).
   */
  [
    ".table-caption",
    ".table-subtitle",
    ".table-shell",
    ".table-footnotes"
  ].forEach(selector => {
    const node =
      source.querySelector(selector);

    if (node) {
      root.appendChild(
        node.cloneNode(true)
      );
    }
  });

  root
    .querySelectorAll(
      [
        ".row-selector",
        ".selector-corner",
        "[data-row-selector]",
        "[data-column-selector]",
        "[data-table-selector]",
        ".figure-hitbox",
        ".facet-hitbox",
        "button"
      ].join(",")
    )
    .forEach(node =>
      node.remove()
    );

  root
    .querySelectorAll(
      ".row-selected, .column-selected, .cell-selected, .table-selected"
    )
    .forEach(node => {
      node.classList.remove(
        "row-selected",
        "column-selected",
        "cell-selected",
        "table-selected"
      );
    });

  return root;
}

function collectLocalStylesForExport() {
  const parts = [];

  for (
    const sheet of
    Array.from(document.styleSheets)
  ) {
    try {
      Array
        .from(sheet.cssRules ?? [])
        .forEach(rule => {
          parts.push(
            rule.cssText
          );
        });
    } catch (error) {
      /*
       * Ignora stylesheets cross-origin.
       * O app.css é local e pode ser serializado.
       */
    }
  }

  return parts.join("\n");
}

function buildTableExportHtml() {
  if (!isCurrentArtifactTable()) {
    throw new Error(
      "O artefato atual não é uma tabela."
    );
  }

  const clone =
    buildCleanTableClone();

  const appStyles =
    collectLocalStylesForExport();

  const exportStyles = `
    html,
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    body {
      padding: 24px;
      width: max-content;
      min-width: 0;
      overflow: visible;
    }

    .export-table-content {
      display: inline-block;
      width: max-content;
      max-width: none;
      margin: 0;
      padding: 0;
    }

    .export-table-content .table-caption,
    .export-table-content .table-subtitle,
    .export-table-content .table-shell,
    .export-table-content .table-footnotes {
      width: auto !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      box-sizing: border-box;
    }

    .export-table-content .table-caption {
      display: block;
      margin-bottom: 10px !important;
      text-align: left !important;
    }

    .export-table-content .table-subtitle {
      display: block;
      margin-bottom: 8px !important;
      text-align: left !important;
    }

    .export-table-content .table-shell {
      display: block;
      overflow: visible !important;
    }

    .export-table-content .stat-table {
      width: auto !important;
      max-width: none !important;
      table-layout: auto !important;
      border-collapse: collapse;
      border-spacing: 0;
    }

    .export-table-content .stat-table th,
    .export-table-content .stat-table td {
      width: auto !important;
      min-width: 0 !important;
      max-width: none !important;
      white-space: nowrap;
    }

    .export-table-content .table-footnotes {
      display: block;
      margin-top: 10px !important;
      text-align: left !important;
    }

    .export-table-content .table-footnotes p {
      margin: 0;
      text-align: left !important;
      white-space: normal;
    }

    .export-table-content .row-selector,
    .export-table-content .selector-corner,
    .export-table-content button {
      display: none !important;
    }
  `;

  const identity =
    getArtifactIdentity();

  const documentHtml =
    `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(identity.id)}</title>
<style>
${appStyles}
${exportStyles}
</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`;

  return {
    fragment:
      clone.outerHTML,
    document:
      documentHtml
  };
}


function buildTablePlainText() {
  const content =
    getWorkingContent();

  if (!content) return "";

  const columns =
    normalizeColumns(content);

  const rows =
    flattenRows(
      content.rows ??
      content.data ??
      []
    );

  const lines = [];

  lines.push(
    columns
      .map(column => column.name)
      .join("\t")
  );

  rows
    .filter(row =>
      row.visible !== false
    )
    .forEach(row => {
      lines.push(
        columns
          .map((column, index) =>
            formatCellForTable(
              getCellValue(
                row,
                column,
                index
              ),
              content
            )
          )
          .join("\t")
      );
    });

  return lines.join("\n");
}

function openTableHtml() {
  if (!isCurrentArtifactTable()) {
    setStatus(
      "error",
      "O artefato atual não é uma tabela."
    );
    return;
  }

  try {
    const html =
      buildTableExportHtml();

    const win =
      window.open(
        "",
        "_blank"
      );

    if (!win) {
      throw new Error(
        "O navegador bloqueou a abertura da nova aba."
      );
    }

    win.document.open();
    win.document.write(
      html.document
    );
    win.document.close();

    setStatus(
      "ok",
      "Tabela aberta em uma nova aba HTML."
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      `Falha ao abrir HTML: ${error.message}`
    );
  }
}

function exportTableHtml() {
  if (!isCurrentArtifactTable()) {
    setStatus(
      "error",
      "O artefato atual não é uma tabela."
    );
    return;
  }

  try {
    const html =
      buildTableExportHtml();

    const blob =
      new Blob(
        [html.document],
        {
          type:
            "text/html;charset=utf-8"
        }
      );

    const identity =
      getArtifactIdentity();

    downloadBlob(
      blob,
      `${sanitizeFilenamePart(identity.id, "table")}.html`
    );

    setStatus(
      "ok",
      "Tabela exportada em HTML."
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      `Falha ao exportar HTML: ${error.message}`
    );
  }
}


function currentTableFilename(extension) {
  const identity = getArtifactIdentity();
  return `${sanitizeFilenamePart(identity.id, "table")}.${extension}`;
}

function createTableExportStage() {
  const clone =
    buildCleanTableClone();

  const stage =
    document.createElement("div");

  stage.className =
    "table-export-stage";

  stage.appendChild(clone);

  document.body.appendChild(
    stage
  );

  const rect =
    clone.getBoundingClientRect();

  return {
    stage,
    clone,
    width:
      Math.max(
        1,
        Math.ceil(rect.width)
      ),
    height:
      Math.max(
        1,
        Math.ceil(rect.height)
      )
  };
}

function svgEscapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function svgColor(value, fallback = "none") {
  if (!value) return fallback;

  if (
    value === "rgba(0, 0, 0, 0)" ||
    value === "transparent"
  ) {
    return fallback;
  }

  return value;
}

function svgFontWeight(value) {
  const numeric =
    Number.parseInt(
      value,
      10
    );

  if (
    Number.isFinite(numeric)
  ) {
    return numeric >= 600
      ? "700"
      : "400";
  }

  return value === "bold"
    ? "700"
    : "400";
}

function makeSvgTextElement(
  text,
  x,
  y,
  style,
  anchor = "start"
) {
  const fontSize =
    Number.parseFloat(
      style.fontSize
    ) || 14;

  const fontFamily =
    style.fontFamily ||
    "Arial";

  const fontWeight =
    svgFontWeight(
      style.fontWeight
    );

  const fontStyle =
    style.fontStyle ||
    "normal";

  const color =
    svgColor(
      style.color,
      "#172033"
    );

  return `<text
    x="${x}"
    y="${y}"
    text-anchor="${anchor}"
    dominant-baseline="middle"
    font-family="${svgEscapeText(fontFamily)}"
    font-size="${fontSize}"
    font-weight="${fontWeight}"
    font-style="${fontStyle}"
    fill="${svgEscapeText(color)}"
  >${svgEscapeText(text)}</text>`;
}

function buildPureTableSvg() {
  const built =
    createTableExportStage();

  const {
    stage,
    clone,
    width,
    height
  } = built;

  const rootRect =
    clone.getBoundingClientRect();

  const elements = [];

  /*
   * Fundo branco explícito.
   */
  elements.push(
    `<rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"/>`
  );

  /*
   * Título, subtítulo e notas.
   */
  [
    ".table-caption",
    ".table-subtitle"
  ].forEach(selector => {
    const node =
      clone.querySelector(selector);

    if (!node) return;

    const rect =
      node.getBoundingClientRect();

    const style =
      getComputedStyle(node);

    const x =
      rect.left -
      rootRect.left;

    const y =
      rect.top -
      rootRect.top +
      rect.height / 2;

    elements.push(
      makeSvgTextElement(
        node.textContent.trim(),
        x,
        y,
        style,
        "start"
      )
    );
  });

  const table =
    clone.querySelector(
      ".stat-table"
    );

  if (table) {
    const cells =
      table.querySelectorAll(
        "th, td"
      );

    cells.forEach(cell => {
      const rect =
        cell.getBoundingClientRect();

      const style =
        getComputedStyle(cell);

      const x =
        rect.left -
        rootRect.left;

      const y =
        rect.top -
        rootRect.top;

      const w =
        rect.width;

      const h =
        rect.height;

      const bg =
        svgColor(
          style.backgroundColor,
          "#ffffff"
        );

      elements.push(
        `<rect
          x="${x}"
          y="${y}"
          width="${w}"
          height="${h}"
          fill="${svgEscapeText(bg)}"
        />`
      );

      const borders = [
        [
          "top",
          style.borderTopWidth,
          style.borderTopColor,
          x,
          y,
          x + w,
          y
        ],
        [
          "right",
          style.borderRightWidth,
          style.borderRightColor,
          x + w,
          y,
          x + w,
          y + h
        ],
        [
          "bottom",
          style.borderBottomWidth,
          style.borderBottomColor,
          x,
          y + h,
          x + w,
          y + h
        ],
        [
          "left",
          style.borderLeftWidth,
          style.borderLeftColor,
          x,
          y,
          x,
          y + h
        ]
      ];

      borders.forEach(
        ([
          side,
          widthValue,
          colorValue,
          x1,
          y1,
          x2,
          y2
        ]) => {
          const lineWidth =
            Number.parseFloat(
              widthValue
            ) || 0;

          const color =
            svgColor(
              colorValue,
              "none"
            );

          if (
            lineWidth > 0 &&
            color !== "none"
          ) {
            elements.push(
              `<line
                x1="${x1}"
                y1="${y1}"
                x2="${x2}"
                y2="${y2}"
                stroke="${svgEscapeText(color)}"
                stroke-width="${lineWidth}"
              />`
            );
          }
        }
      );

      const text =
        cell.textContent.trim();

      if (!text) {
        return;
      }

      const padLeft =
        Number.parseFloat(
          style.paddingLeft
        ) || 0;

      const padRight =
        Number.parseFloat(
          style.paddingRight
        ) || 0;

      const align =
        style.textAlign;

      let textX;
      let anchor;

      if (align === "center") {
        textX =
          x + w / 2;
        anchor =
          "middle";
      } else if (align === "right") {
        textX =
          x + w -
          padRight;
        anchor =
          "end";
      } else {
        textX =
          x + padLeft;
        anchor =
          "start";
      }

      const textY =
        y + h / 2;

      elements.push(
        makeSvgTextElement(
          text,
          textX,
          textY,
          style,
          anchor
        )
      );
    });
  }

  const footnotes =
    clone.querySelector(
      ".table-footnotes"
    );

  if (footnotes) {
    footnotes
      .querySelectorAll("p")
      .forEach(note => {
        const rect =
          note.getBoundingClientRect();

        const style =
          getComputedStyle(note);

        elements.push(
          makeSvgTextElement(
            note.textContent.trim(),
            rect.left -
              rootRect.left,
            rect.top -
              rootRect.top +
              rect.height / 2,
            style,
            "start"
          )
        );
      });
  }

  const svgText =
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >
      ${elements.join("\n")}
    </svg>`;

  return {
    ...built,
    svgText
  };
}

function currentTableFilename(extension) {
  const identity =
    getArtifactIdentity();

  return (
    `${sanitizeFilenamePart(identity.id, "table")}.` +
    extension
  );
}

function exportTableSvg() {
  let built = null;

  try {
    built =
      buildPureTableSvg();

    downloadBlob(
      new Blob(
        [built.svgText],
        {
          type:
            "image/svg+xml;charset=utf-8"
        }
      ),
      currentTableFilename(
        "svg"
      )
    );

    setStatus(
      "ok",
      "Tabela exportada em SVG."
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      `Falha ao exportar SVG: ${error.message}`
    );
  } finally {
    built?.stage?.remove();
  }
}

function canvasFontFromStyle(style) {
  const fontStyle =
    style.fontStyle &&
    style.fontStyle !== "normal"
      ? style.fontStyle
      : "";

  const fontWeight =
    style.fontWeight &&
    style.fontWeight !== "normal"
      ? style.fontWeight
      : "";

  const fontSize =
    style.fontSize ||
    "14px";

  const fontFamily =
    style.fontFamily ||
    "Arial";

  return [
    fontStyle,
    fontWeight,
    fontSize,
    fontFamily
  ]
    .filter(Boolean)
    .join(" ");
}

function drawCanvasText(
  ctx,
  text,
  x,
  y,
  style,
  align = "left"
) {
  ctx.save();

  ctx.font =
    canvasFontFromStyle(
      style
    );

  ctx.fillStyle =
    svgColor(
      style.color,
      "#172033"
    );

  ctx.textBaseline =
    "middle";

  ctx.textAlign =
    align;

  ctx.fillText(
    String(text ?? ""),
    x,
    y
  );

  ctx.restore();
}

function drawTableToCanvas(
  clone,
  canvas,
  scale
) {
  const rootRect =
    clone.getBoundingClientRect();

  const ctx =
    canvas.getContext("2d");

  ctx.save();
  ctx.scale(scale, scale);

  ctx.fillStyle =
    "#ffffff";

  ctx.fillRect(
    0,
    0,
    rootRect.width,
    rootRect.height
  );

  /*
   * Título e subtítulo.
   */
  [
    ".table-caption",
    ".table-subtitle"
  ].forEach(selector => {
    const node =
      clone.querySelector(
        selector
      );

    if (!node) return;

    const rect =
      node.getBoundingClientRect();

    const style =
      getComputedStyle(node);

    drawCanvasText(
      ctx,
      node.textContent.trim(),
      rect.left -
        rootRect.left,
      rect.top -
        rootRect.top +
        rect.height / 2,
      style,
      "left"
    );
  });

  /*
   * Células.
   */
  const table =
    clone.querySelector(
      ".stat-table"
    );

  if (table) {
    table
      .querySelectorAll(
        "th, td"
      )
      .forEach(cell => {
        const rect =
          cell.getBoundingClientRect();

        const style =
          getComputedStyle(cell);

        const x =
          rect.left -
          rootRect.left;

        const y =
          rect.top -
          rootRect.top;

        const w =
          rect.width;

        const h =
          rect.height;

        const bg =
          svgColor(
            style.backgroundColor,
            "#ffffff"
          );

        ctx.fillStyle =
          bg === "none"
            ? "#ffffff"
            : bg;

        ctx.fillRect(
          x,
          y,
          w,
          h
        );

        const borders = [
          [
            style.borderTopWidth,
            style.borderTopColor,
            x,
            y,
            x + w,
            y
          ],
          [
            style.borderRightWidth,
            style.borderRightColor,
            x + w,
            y,
            x + w,
            y + h
          ],
          [
            style.borderBottomWidth,
            style.borderBottomColor,
            x,
            y + h,
            x + w,
            y + h
          ],
          [
            style.borderLeftWidth,
            style.borderLeftColor,
            x,
            y,
            x,
            y + h
          ]
        ];

        borders.forEach(
          ([
            widthValue,
            colorValue,
            x1,
            y1,
            x2,
            y2
          ]) => {
            const lineWidth =
              Number.parseFloat(
                widthValue
              ) || 0;

            const color =
              svgColor(
                colorValue,
                "none"
              );

            if (
              lineWidth > 0 &&
              color !== "none"
            ) {
              ctx.save();

              ctx.strokeStyle =
                color;

              ctx.lineWidth =
                lineWidth;

              ctx.beginPath();

              ctx.moveTo(
                x1,
                y1
              );

              ctx.lineTo(
                x2,
                y2
              );

              ctx.stroke();

              ctx.restore();
            }
          }
        );

        const text =
          cell.textContent.trim();

        if (!text) return;

        const padLeft =
          Number.parseFloat(
            style.paddingLeft
          ) || 0;

        const padRight =
          Number.parseFloat(
            style.paddingRight
          ) || 0;

        let textX;
        let canvasAlign;

        if (
          style.textAlign ===
          "center"
        ) {
          textX =
            x + w / 2;

          canvasAlign =
            "center";
        } else if (
          style.textAlign ===
          "right"
        ) {
          textX =
            x +
            w -
            padRight;

          canvasAlign =
            "right";
        } else {
          textX =
            x +
            padLeft;

          canvasAlign =
            "left";
        }

        drawCanvasText(
          ctx,
          text,
          textX,
          y + h / 2,
          style,
          canvasAlign
        );
      });
  }

  /*
   * Notas.
   */
  const footnotes =
    clone.querySelector(
      ".table-footnotes"
    );

  if (footnotes) {
    footnotes
      .querySelectorAll("p")
      .forEach(note => {
        const rect =
          note.getBoundingClientRect();

        const style =
          getComputedStyle(note);

        drawCanvasText(
          ctx,
          note.textContent.trim(),
          rect.left -
            rootRect.left,
          rect.top -
            rootRect.top +
            rect.height / 2,
          style,
          "left"
        );
      });
  }

  ctx.restore();
}

async function exportTablePng() {
  let built = null;

  try {
    built =
      createTableExportStage();

    const scale = 2;

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width =
      Math.max(
        1,
        Math.ceil(
          built.width *
          scale
        )
      );

    canvas.height =
      Math.max(
        1,
        Math.ceil(
          built.height *
          scale
        )
      );

    drawTableToCanvas(
      built.clone,
      canvas,
      scale
    );

    const blob =
      await new Promise(
        resolve =>
          canvas.toBlob(
            resolve,
            "image/png",
            1
          )
      );

    if (!blob) {
      throw new Error(
        "Não foi possível gerar o PNG."
      );
    }

    downloadBlob(
      blob,
      currentTableFilename(
        "png"
      )
    );

    setStatus(
      "ok",
      "Tabela exportada em PNG em alta resolução (2×)."
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      `Falha ao exportar PNG: ${error.message}`
    );
  } finally {
    built?.stage?.remove();
  }
}


function updateExportButtons() {
  const hasArtifact =
    Boolean(
      state.workingArtifact
    );

  const isFigure =
    hasArtifact &&
    isCurrentArtifactFigure();

  const isTable =
    hasArtifact &&
    isCurrentArtifactTable();

  /*
   * Em vez de mostrar formatos inválidos desativados,
   * mostramos apenas o que faz sentido para o artefato atual.
   */
  if (el.exportPng) {
    el.exportPng.hidden =
      !hasArtifact;
  }

  if (el.exportSvg) {
    el.exportSvg.hidden =
      !hasArtifact;
  }

  if (el.openTableHtml) {
    el.openTableHtml.hidden =
      !isTable;
  }

  if (el.exportTableHtml) {
    el.exportTableHtml.hidden =
      !isTable;
  }
}

function updateUndoButton() {
  if (el.undoEdit) el.undoEdit.disabled = state.undoStack.length === 0;
}
function resetUndoHistory() {
  state.undoStack = [];
  updateUndoButton();
}
function pushUndoSnapshot() {
  if (state.isUndoing || !state.workingArtifact) return;
  state.undoStack.push(deepClone(state.workingArtifact));
  if (state.undoStack.length > 50) state.undoStack.shift();
  updateUndoButton();
}
function undoLastEdit() {
  if (
    !state.undoStack.length ||
    !state.workingArtifact
  ) {
    return;
  }

  state.isUndoing = true;

  state.workingArtifact =
    deepClone(
      state.undoStack.pop()
    );

  state.selection = null;
  state.selectedSeries = null;
  state.selectedFacetKey = null;

  /*
   * Limpa apenas a interface de seleção.
   * Não chama clearSelection(), pois ela renderiza novamente.
   */
  el.propertiesTitle.textContent =
    "Nada selecionado";

  el.selectionKind.textContent = "";
  el.propertiesEmpty.hidden = false;
  el.rowProperties.hidden = true;

  if (el.tableStructureActions) {
    el.tableStructureActions.hidden = true;
  }

  if (el.tableTextAccordion) {
    el.tableTextAccordion.hidden = true;
  }

  if (el.tableThemeAccordion) {
    el.tableThemeAccordion.hidden = true;
  }

  el.figureProperties.hidden = true;
  el.figureProperties.classList.add(
    "force-hidden"
  );

  enforceEditorContext(
    getWorkingKind()
  );

  renderArtifact(
    state.workingArtifact
  );

  state.isUndoing = false;

  updateUndoButton();

  setStatus(
    "ok",
    state.undoStack.length
      ? `Alteração desfeita. ${state.undoStack.length} ação(ões) ainda podem ser desfeitas.`
      : "Alteração desfeita."
  );
}

function clearSelection() {
  state.selection = null;

  el.propertiesTitle.textContent =
    "Nada selecionado";

  el.selectionKind.textContent = "";
  el.propertiesEmpty.hidden = false;
  el.rowProperties.hidden = true;

  if (el.tableStructureActions) {
    el.tableStructureActions.hidden = true;
  }

  el.tableTextAccordion.hidden = true;
  el.tableThemeAccordion.hidden = true;
  el.figureProperties.hidden = true;
  el.figureProperties.classList.add("force-hidden");

  enforceEditorContext(
    getWorkingKind()
  );

  if (state.workingArtifact) {
    renderArtifact(state.workingArtifact);
  }
}

function getSelectionTarget() {
  const selection = state.selection;

  if (!selection) return null;

  if (selection.type === "table") {
    const content = getWorkingContent();
    if (!content) return null;
    content.style ??= {};
    return content;
  }

  if (selection.type === "row") {
    return findRowById(
      getContentRows(),
      selection.rowId
    );
  }

  if (selection.type === "column") {
    return getEditableColumn(
      selection.columnId
    );
  }

  if (selection.type === "cell") {
    const row = findRowById(
      getContentRows(),
      selection.rowId
    );

    if (!row) return null;

    return getEditableCell(
      row,
      selection.columnId
    );
  }

  return null;
}

function targetStyle(target) {
  if (!target || typeof target !== "object") {
    return {};
  }

  return target.style ?? {};
}


function getEffectiveSelectionStyle(selection) {
  const content =
    getWorkingContent();

  if (!content || !selection) {
    return {};
  }

  const tableStyle =
    normalizeStyle(content.style);

  if (selection.type === "table") {
    return tableStyle;
  }

  if (selection.type === "column") {
    const column =
      getEditableColumn(
        selection.columnId
      );

    return mergeStyles(
      tableStyle,
      column?.style
    );
  }

  if (selection.type === "row") {
    const row =
      findRowById(
        getContentRows(),
        selection.rowId
      );

    return mergeStyles(
      tableStyle,
      row?.style
    );
  }

  if (selection.type === "cell") {
    const row =
      findRowById(
        getContentRows(),
        selection.rowId
      );

    const column =
      getEditableColumn(
        selection.columnId
      );

    const cell =
      row
        ? getEditableCell(
            row,
            selection.columnId
          )
        : null;

    return mergeStyles(
      tableStyle,
      column?.style,
      row?.style,
      cell?.style
    );
  }

  return {};
}


const TABLE_THEMES = {
  clean: {
    header_background: "#f5f7fa",
    border_color: "#d7dde5",
    text_color: "#172033",
    background: "#ffffff",
    stripe_background: "#ffffff"
  },
  academic: {
    header_background: "#ffffff",
    border_color: "#3f4854",
    text_color: "#111827",
    background: "#ffffff",
    stripe_background: "#ffffff"
  },
  soft: {
    header_background: "#eef3f7",
    border_color: "#d8e0e8",
    text_color: "#263442",
    background: "#ffffff",
    stripe_background: "#f8fafc"
  },
  striped: {
    header_background: "#e9eef4",
    border_color: "#cfd8e3",
    text_color: "#1f2937",
    background: "#ffffff",
    stripe_background: "#f4f7fa"
  },
  dark: {
    header_background: "#263241",
    border_color: "#465466",
    text_color: "#f1f5f9",
    background: "#18212d",
    stripe_background: "#202b39"
  }
};

function ensureTableAppearance(content) {
  content.table_appearance ??= {};
  return content.table_appearance;
}

function applyTableThemePreset(content, themeName) {
  const appearance =
    ensureTableAppearance(content);

  const preset =
    TABLE_THEMES[themeName] ??
    TABLE_THEMES.clean;

  appearance.theme = themeName;
  appearance.header_background =
    preset.header_background;
  appearance.border_color =
    preset.border_color;
  appearance.text_color =
    preset.text_color;
  appearance.background =
    preset.background;
  appearance.stripe_background =
    preset.stripe_background;

  appearance.density ??= "normal";
  appearance.font ??= "system-ui";
}

function getTableThemePreset(content) {
  const appearance =
    content?.table_appearance ?? {};

  return (
    TABLE_THEMES[appearance.theme ?? "clean"] ??
    TABLE_THEMES.clean
  );
}

function selectTarget(selection) {
  state.selection = selection;

  const target = getSelectionTarget();

  if (!target) {
    clearSelection();
    return;
  }

  let title = "";
  let kind = "";

  if (selection.type === "table") {
    title = "Tabela inteira";
    kind = "Tabela";
  }

  if (selection.type === "row") {
    const row = target;

    title = String(
      getRowLabel(
        row,
        selection.rowId
      )
    );

    kind = "Linha";
  }

  if (selection.type === "column") {
    const column = normalizeColumn(
      target,
      0
    );

    title = column.name;
    kind = "Coluna";
  }

  if (selection.type === "cell") {
    const row = findRowById(
      getContentRows(),
      selection.rowId
    );

    const column = getContentColumns().find(
      col => String(col.id) === String(selection.columnId)
    );

    title =
      `${getRowLabel(row, selection.rowId)} × ` +
      `${column?.name ?? selection.columnId}`;

    kind = "Célula";
  }

  const style =
    getEffectiveSelectionStyle(
      selection
    );

  el.propertiesTitle.textContent = title;
  el.selectionKind.textContent = kind;

  updateTableStructureActions(
    selection
  );

  /*
   * Campos contextuais de conteúdo:
   * coluna -> cabeçalho
   * célula -> valor/texto
   */
  el.columnNameField.hidden =
    selection.type !== "column";

  el.cellValueField.hidden =
    selection.type !== "cell";

  if (selection.type === "column") {
    const column =
      normalizeColumn(target, 0);

    el.propColumnName.value =
      column.name;
  } else {
    el.propColumnName.value = "";
  }

  if (selection.type === "cell") {
    const row =
      findRowById(
        getContentRows(),
        selection.rowId
      );

    const columns =
      getContentColumns();

    const columnIndex =
      columns.findIndex(
        col =>
          String(col.id) ===
          String(selection.columnId)
      );

    const column =
      columns[columnIndex];

    el.propCellValue.value =
      formatCell(
        getCellValue(
          row,
          column ?? { id: selection.columnId },
          Math.max(0, columnIndex)
        )
      );
  } else {
    el.propCellValue.value = "";
  }

  enforceEditorContext("table");

  el.propertiesEmpty.hidden = true;
  el.rowProperties.hidden = false;

  /*
   * Tabela e gráfico são contextos mutuamente exclusivos.
   * A classe reforça o hidden mesmo contra estilos internos com !important.
   */
  el.figureProperties.hidden = true;
  el.figureProperties.classList.add("force-hidden");

  el.tableTextAccordion.hidden =
    selection.type !== "table";

  el.tableThemeAccordion.hidden =
    selection.type !== "table";

  if (selection.type === "table") {
    const content =
      getWorkingContent();

    el.tableTitle.value =
      state.workingArtifact?.artifact?.title ??
      content?.title ??
      "";

    el.tableSubtitle.value =
      content?.subtitle ?? "";

    el.tableNotes.value =
      typeof content?.notes === "string"
        ? content.notes
        : normalizeFootnotes(content)
            .map(note => note.id ? `${note.id} ${note.text}` : note.text)
            .join("; ");

    const appearance =
      ensureTableAppearance(content);

    const preset =
      getTableThemePreset(content);

    el.tableTheme.value =
      appearance.theme ?? "clean";
    el.tableDensity.value =
      appearance.density ?? "normal";
    el.tableGlobalFont.value =
      appearance.font ?? "system-ui";

    el.tableDecimalSeparator.value =
      appearance.decimal_separator ??
      "original";

    el.tableHeaderBackground.value =
      appearance.header_background ??
      preset.header_background;
    el.tableBorderColor.value =
      appearance.border_color ??
      preset.border_color;
  }

  el.propBold.checked = style.bold === true;
  el.propItalic.checked = style.italic === true;
  el.propFont.value = style.font ?? "";
  el.propFontSize.value = style.font_size ?? "";
  el.propBorderTop.checked =
    style.border_top === true;
  el.propBorderBottom.checked =
    style.border_bottom === true;
  el.propBorderLeft.checked =
    style.border_left === true;
  el.propBorderRight.checked =
    style.border_right === true;
  el.propAlign.value = style.align ?? "";
  el.propBackground.value =
    style.background ?? "#ffffff";
  el.propColor.value =
    style.color ?? "#172033";

  el.propHiddenRow.hidden =
    selection.type === "cell" ||
    selection.type === "table";

  el.propHidden.disabled =
    selection.type === "cell" ||
    selection.type === "table";

  el.propHiddenLabel.textContent =
    selection.type === "column"
      ? "Ocultar coluna"
      : "Ocultar linha";

  if (selection.type === "row") {
    el.propHidden.checked =
      target.visible === false;
  } else if (selection.type === "column") {
    el.propHidden.checked =
      target.visible === false;
  } else {
    el.propHidden.checked = false;
  }

  renderArtifact(state.workingArtifact);
}

function updateSelection(mutator) {
  const selection =
    state.selection
      ? { ...state.selection }
      : null;

  const target =
    getSelectionTarget();

  if (!target || !selection) return;

  mutator(target);

  /*
   * selectTarget() também renderiza, então fazemos uma única
   * atualização para evitar flicker e problemas no seletor de cor.
   */
  selectTarget(selection);
}

function ensureStyle(target) {
  if (
    !target.style ||
    typeof target.style !== "object"
  ) {
    target.style = {};
  }

  return target.style;
}

function resetSelectedStyle() {
  const target = getSelectionTarget();

  if (!target) return;

  delete target.style;

  if (
    state.selection?.type === "row" ||
    state.selection?.type === "column"
  ) {
    delete target.visible;
  }

  selectTarget(state.selection);
}

function renderTable(raw) {
  enforceEditorContext("table");

  const { storage, content } = unwrapArtifact(raw);

  const columns = normalizeColumns(content);
  const rows = flattenRows(
    content?.rows ??
    content?.data ??
    []
  );
  const footnotes = normalizeFootnotes(content);

  const title =
    content?.title ??
    content?.caption ??
    storage?.artifact?.title ??
    getSelectedArtifact()?.title ??
    "Tabela";

  const subtitle =
    content?.subtitle ??
    content?.description ??
    "";

  const tableStyle = normalizeStyle(
    content?.style ??
    content?.table_style ??
    {}
  );

  const tableAppearance =
    ensureTableAppearance(content);

  const tablePreset =
    getTableThemePreset(content);

  const tableThemeName =
    tableAppearance.theme ?? "clean";

  const tableDensity =
    tableAppearance.density ?? "normal";

  const tableFont =
    tableAppearance.font ?? "system-ui";

  const tableBackground =
    tableAppearance.background ??
    tablePreset.background;

  const tableTextColor =
    tableAppearance.text_color ??
    tablePreset.text_color;

  const tableHeaderBackground =
    tableAppearance.header_background ??
    tablePreset.header_background;

  const tableBorderColor =
    tableAppearance.border_color ??
    tablePreset.border_color;

  const tableStripeBackground =
    tableAppearance.stripe_background ??
    tablePreset.stripe_background;

  if (!columns.length || !rows.length) {
    el.artifactView.innerHTML = `
      <div class="render-warning">
        O JSON foi carregado, mas ainda não consegui identificar
        automaticamente <strong>columns</strong> e <strong>rows</strong>.
      </div>
    `;
    el.artifactViewTitle.textContent = title;
    return;
  }

  const visibleColumns = columns.filter(column => {
    const editable = getEditableColumn(column.id);
    return editable?.visible !== false;
  });

  const headerHtml = visibleColumns
    .map(column => {
      const editableColumn = getEditableColumn(column.id);
      const columnStyle = mergeStyles(
        tableStyle,
        editableColumn?.style ?? column?.style
      );

      const classes = [
        "column-selector"
      ];

      if (
        state.selection?.type === "column" &&
        String(state.selection.columnId) === String(column.id)
      ) {
        classes.push("column-selected");
      }

      const styleClasses = styleToCellClasses(columnStyle);
      classes.push(...styleClasses);

      const inlineCss = styleToInlineCss(columnStyle);

      return `
        <th class="${classes.join(" ")}"${inlineCss ? ` style="${inlineCss}"` : ""}>
          <button
            type="button"
            data-column-selector="${escapeAttribute(column.id)}"
            title="Selecionar coluna"
          >▼</button>
          <div>${escapeHtml(column.name)}</div>
        </th>
      `;
    })
    .join("");

  const bodyHtml = rows
    .filter(row => row.visible !== false)
    .map(row => {
      const rowClasses = [];

      if (row.__depth > 0) {
        rowClasses.push("subrow");
      }

      if (isSectionRow(row)) {
        rowClasses.push("section-row");
      }

      if (
        state.selection?.type === "row" &&
        String(state.selection.rowId) === String(row.__rowId)
      ) {
        rowClasses.push("row-selected");
      }

      const rowStyle = mergeStyles(
        tableStyle,
        row?.style
      );

      const rowAttrs = styleToRowAttributes(rowStyle);

      const selectorCell = `
        <td class="row-selector">
          <button
            type="button"
            data-row-selector="${escapeAttribute(row.__rowId)}"
            title="Selecionar linha"
          >▶</button>
        </td>
      `;

      const cells = visibleColumns
        .map((column, index) => {
          const rawCell = getCellObject(
            row,
            column,
            index
          );

          const rawValue = getCellValue(
            row,
            column,
            index
          );

          const value =
            formatCellForTable(
              rawValue,
              content
            );

          const editableColumn = getEditableColumn(column.id);

          const cellStyle = mergeStyles(
            tableStyle,
            editableColumn?.style,
            row?.style,
            rawCell && typeof rawCell === "object"
              ? rawCell.style
              : null
          );

          const classes = [
            "cell-selectable"
          ];

          if (index === 0) {
            classes.push("row-label");
          }

          classes.push(
            ...styleToCellClasses(cellStyle)
          );

          if (
            state.selection?.type === "column" &&
            String(state.selection.columnId) === String(column.id)
          ) {
            classes.push("column-selected");
          }

          if (
            state.selection?.type === "cell" &&
            String(state.selection.rowId) === String(row.__rowId) &&
            String(state.selection.columnId) === String(column.id)
          ) {
            classes.push("cell-selected");
          }

          const inlineCss = styleToInlineCss(cellStyle);

          return `
            <td
              class="${classes.join(" ")}"
              data-cell-row="${escapeAttribute(row.__rowId)}"
              data-cell-column="${escapeAttribute(column.id)}"
              ${inlineCss ? `style="${inlineCss}"` : ""}
            >${escapeHtml(value)}</td>
          `;
        })
        .join("");

      return `
        <tr
          class="${rowClasses.join(" ")}"
          ${rowAttrs}
          data-row-id="${escapeAttribute(row.__rowId)}"
        >
          ${selectorCell}
          ${cells}
        </tr>
      `;
    })
    .join("");

  const footnoteHtml = footnotes.length
    ? `
      <div class="table-footnotes">
        ${footnotes
          .map(note => {
            const marker = note.id
              ? `<strong>${escapeHtml(note.id)}</strong> `
              : `<strong>Nota.</strong> `;

            return `<p>${marker}${escapeHtml(note.text)}</p>`;
          })
          .join("")}
      </div>
    `
    : "";

  el.artifactView.innerHTML = `
    <div class="table-caption">${escapeHtml(title)}</div>
    ${subtitle
      ? `<div class="table-subtitle">${escapeHtml(subtitle)}</div>`
      : ""}
    <div
      class="table-shell table-theme-${escapeAttribute(tableThemeName)} table-density-${escapeAttribute(tableDensity)}${state.selection?.type === "table" ? " table-selected" : ""}"
      style="
        --table-bg:${escapeAttribute(tableBackground)};
        --table-text:${escapeAttribute(tableTextColor)};
        --table-header-bg:${escapeAttribute(tableHeaderBackground)};
        --table-border:${escapeAttribute(tableBorderColor)};
        --table-stripe:${escapeAttribute(tableStripeBackground)};
        --table-font:${escapeAttribute(tableFont)};
      "
    >
      <table class="stat-table">
        <thead>
          <tr>
            <th class="selector-corner">
            <button type="button" data-table-selector title="Selecionar tabela inteira">◆</button>
          </th>
            ${headerHtml}
          </tr>
        </thead>
        <tbody>
          ${bodyHtml}
        </tbody>
      </table>
    </div>
    ${footnoteHtml}
  `;

  el.artifactView.classList.remove("empty-state");
  el.artifactViewTitle.textContent = title;

  el.artifactView
    .querySelector("[data-table-selector]")
    ?.addEventListener("click", event => {
      event.stopPropagation();
      selectTarget({ type: "table" });
    });

  el.artifactView
    .querySelectorAll("[data-row-selector]")
    .forEach(button => {
      button.addEventListener(
        "click",
        event => {
          event.stopPropagation();

          selectTarget({
            type: "row",
            rowId: button.dataset.rowSelector
          });
        }
      );
    });

  el.artifactView
    .querySelectorAll("[data-column-selector]")
    .forEach(button => {
      button.addEventListener(
        "click",
        event => {
          event.stopPropagation();

          selectTarget({
            type: "column",
            columnId: button.dataset.columnSelector
          });
        }
      );
    });

  el.artifactView
    .querySelectorAll("[data-cell-row][data-cell-column]")
    .forEach(cell => {
      cell.addEventListener(
        "click",
        event => {
          event.stopPropagation();

          selectTarget({
            type: "cell",
            rowId: cell.dataset.cellRow,
            columnId: cell.dataset.cellColumn
          });
        }
      );
    });
  requestAnimationFrame(() => {
    if (state.previewZoomMode === "fit") {
      fitPreviewToWidth();
    } else {
      applyPreviewZoom(
        state.previewZoom ?? 1,
        "manual"
      );
    }
  });

}



function getLegendField(content) {
  const mapping = content?.mapping ?? {};

  if (content?.type === "density") {
    return mapping.group ?? mapping.color ?? null;
  }

  if (content?.type === "stacked_bar_percent") {
    return mapping.fill ?? mapping.color ?? mapping.series ?? null;
  }

  if (content?.type === "pie") {
    return mapping.category ?? mapping.color ?? mapping.fill ?? mapping.label ?? null;
  }

  if (content?.type === "boxplot") {
    return (
      mapping.color ??
      mapping.group ??
      mapping.x ??
      null
    );
  }

  if (
    content?.type === "scatter" ||
    content?.type === "faceted_scatter" ||
    content?.type === "histogram"
  ) {
    return (
      mapping.color ??
      mapping.group ??
      mapping.fill ??
      "__all__"
    );
  }

  return mapping.color ?? mapping.group ?? mapping.fill ?? null;
}

function getLegendValues(content, field) {
  if (!field || !Array.isArray(content?.data)) return [];

  if (field === "__all__") {
    if (content?.type === "histogram") {
      return ["Barras"];
    }

    return ["Pontos"];
  }

  const values = [];
  const seen = new Set();

  content.data.forEach(row => {
    const value = row?.[field];
    const key = String(value);

    if (
      value !== undefined &&
      value !== null &&
      !seen.has(key)
    ) {
      seen.add(key);
      values.push(value);
    }
  });

  return values;
}

function ensureLegendStructures(content, field) {
  content.legend ??= {};
  content.labels ??= {};
  content.series_styles ??= {};

  if (field) {
    content.labels[field] ??= {};
    content.series_styles[field] ??= {};
  }
}

const DEFAULT_SERIES_COLORS = [
  "#4C78A8",
  "#F58518",
  "#54A24B",
  "#E45756",
  "#72B7B2",
  "#B279A2",
  "#FF9DA6",
  "#9D755D",
  "#BAB0AC"
];

function getSeriesColor(content, field, rawValue, index) {
  return (
    content?.series_styles?.[field]?.[String(rawValue)]?.color ??
    DEFAULT_SERIES_COLORS[index % DEFAULT_SERIES_COLORS.length]
  );
}



function getFacetField(content) {
  const mapping = content?.mapping ?? {};

  return (
    mapping.facet ??
    mapping.column ??
    mapping.panel ??
    null
  );
}

function getFacetValues(content, field) {
  if (!field || !Array.isArray(content?.data)) return [];

  const values = [];
  const seen = new Set();

  content.data.forEach(row => {
    const value = row?.[field];
    const key = String(value);

    if (
      value !== undefined &&
      value !== null &&
      !seen.has(key)
    ) {
      seen.add(key);
      values.push(value);
    }
  });

  return values;
}

function ensureFacetStyles(content, field) {
  content.facet_styles ??= {};
  content.facet_styles[field] ??= {};
}

function renderFacetOverrideControls(content) {
  const isFacet =
    content?.type === "faceted_scatter";

  if (!isFacet) {
    el.facetOverrideControls.hidden = true;
    return;
  }

  const field = getFacetField(content);

  if (!field) {
    el.facetOverrideControls.hidden = true;
    return;
  }

  const values = getFacetValues(content, field);

  if (!values.length) {
    el.facetOverrideControls.hidden = true;
    return;
  }

  ensureFacetStyles(content, field);
  el.facetOverrideControls.hidden = false;

  const validKeys = values.map(value => String(value));

  if (
    !state.selectedFacetKey ||
    !validKeys.includes(String(state.selectedFacetKey))
  ) {
    state.selectedFacetKey = validKeys[0];
  }

  const selectedKey = String(state.selectedFacetKey);

  el.facetPanelButtons.innerHTML = values
    .map(value => {
      const key = String(value);
      const active = key === selectedKey;

      const displayLabel =
        content?.facet_labels?.[field]?.[key] ??
        key;

      return `
        <button
          type="button"
          class="facet-panel-button${active ? " active" : ""}"
          data-facet-panel="${escapeAttribute(key)}"
        >
          ${escapeHtml(displayLabel)}
        </button>
      `;
    })
    .join("");

  el.facetPanelButtons
    .querySelectorAll("[data-facet-panel]")
    .forEach(button => {
      button.addEventListener("click", () => {
        state.selectedFacetKey =
          button.dataset.facetPanel;

        selectFacetPanel(
          content,
          state.selectedFacetKey
        );

        renderFacetOverrideControls(content);
      });
    });

  const selectedLabel =
    content?.facet_labels?.[field]?.[selectedKey] ??
    selectedKey;

  if (el.selectedFacetName) {
    el.selectedFacetName.textContent =
      selectedLabel;
  }

  const configured =
    content?.facet_styles?.[field]?.[selectedKey]?.color;

  el.facetPanelColor.value =
    configured ?? "#4C78A8";
}

function getSelectedSeriesStyle(content) {
  const selected = state.selectedSeries;

  if (!selected) return null;

  ensureLegendStructures(content, selected.field);

  content.series_styles[selected.field][selected.key] ??= {};

  return content.series_styles[selected.field][selected.key];
}

function selectSeries(content, field, key) {
  state.selectedSeries = {
    field,
    key: String(key)
  };

  const rawValues = getLegendValues(content, field);
  const index = rawValues.findIndex(
    value => String(value) === String(key)
  );

  const style = getSelectedSeriesStyle(content) ?? {};
  const label =
    content?.labels?.[field]?.[String(key)] ??
    String(key);

  el.seriesEditorSection.hidden = false;
  el.seriesName.value = label;
  el.seriesColor.value =
    style.color ??
    getSeriesColor(
      content,
      field,
      key,
      Math.max(index, 0)
    );

  el.seriesOpacity.value =
    style.opacity ??
    content?.parameters?.opacity ??
    content?.parameters?.alpha ??
    0.85;

  el.seriesLineWidth.value =
    style.line_width ??
    content?.parameters?.line_width ??
    2;

  el.seriesFillVisible.checked =
    style.fill_visible !== false;

  const type = content?.type;
  const supportsLine =
    type === "density" ||
    type === "scatter" ||
    type === "faceted_scatter";

  const supportsFillToggle =
    type === "density";

  const supportsScatterControls =
    type === "scatter" ||
    type === "faceted_scatter";

  el.scatterSeriesControls.hidden =
    !supportsScatterControls;

  if (supportsScatterControls) {
    el.seriesPointSize.value =
      style.point_size ??
      content?.parameters?.size ??
      75;

    el.seriesPointShape.value =
      style.point_shape ??
      "circle";
  }

  const supportsOpacity =
    [
      "density",
      "scatter",
      "faceted_scatter",
      "histogram",
      "boxplot",
      "stacked_bar_percent",
      "pie"
    ].includes(type);

  el.seriesLineWidthField.hidden = !supportsLine;
  el.seriesFillField.hidden = !supportsFillToggle;

  const opacityField =
    el.seriesOpacity.closest(".field");

  if (opacityField) {
    opacityField.hidden = !supportsOpacity;
  }

  el.legendItemsEditor
    .querySelectorAll(".legend-item-card")
    .forEach(card => {
      card.classList.toggle(
        "series-selected",
        String(card.dataset.legendItem) === String(key)
      );
    });

  el.figureSelectionKind.textContent =
    `Série: ${label}`;
  el.propertiesTitle.textContent =
    content?.title ?? "Gráfico";

  setContextVisibility(
    "series",
    content
  );
  updatePlotLayerChooser(
    content,
    "series"
  );
}

function clearSeriesSelection() {
  state.selectedSeries = null;
  el.seriesEditorSection.hidden = true;

  el.legendItemsEditor
    ?.querySelectorAll(".legend-item-card")
    .forEach(card => {
      card.classList.remove("series-selected");
    });
}


function renderSeriesBrowser(content) {
  const field = getLegendField(content);

  if (!field) {
    el.seriesBrowserSection.hidden = true;
    el.seriesBrowser.innerHTML = "";
    return;
  }

  const values = getLegendValues(content, field);

  if (!values.length) {
    el.seriesBrowserSection.hidden = true;
    el.seriesBrowser.innerHTML = "";
    return;
  }

  ensureLegendStructures(content, field);

  el.seriesBrowserSection.hidden = false;

  el.seriesBrowser.innerHTML = values
    .map((rawValue, index) => {
      const key = String(rawValue);

      const label =
        content?.labels?.[field]?.[key] ??
        key;

      const color =
        getSeriesColor(
          content,
          field,
          rawValue,
          index
        );

      const active =
        state.selectedSeries?.field === field &&
        String(state.selectedSeries?.key) === key;

      return `
        <button
          type="button"
          class="series-browser-button${active ? " active" : ""}"
          data-series-browser="${escapeAttribute(key)}"
        >
          <span
            class="series-browser-swatch"
            style="background:${escapeAttribute(color)}"
          ></span>
          <span>${escapeHtml(label)}</span>
        </button>
      `;
    })
    .join("");

  el.seriesBrowser
    .querySelectorAll("[data-series-browser]")
    .forEach(button => {
      button.addEventListener("click", () => {
        selectSeries(
          content,
          field,
          button.dataset.seriesBrowser
        );

        state.selection = {
          type: "figure",
          part: "series"
        };

        setContextVisibility(
          "series",
          content
        );

        renderSeriesBrowser(content);
      });
    });
}

function renderLegendItemsEditor(content) {
  const field = getLegendField(content);

  if (field === "__all__") {
    el.legendItemsEditor.innerHTML =
      '<div class="properties-empty">Este gráfico não possui legenda categórica.</div>';
    return;
  }

  if (!field) {
    el.legendItemsEditor.innerHTML =
      '<div class="properties-empty">Este gráfico não possui itens de legenda editáveis.</div>';
    return;
  }

  ensureLegendStructures(content, field);

  const values = getLegendValues(content, field);

  el.legendItemsEditor.innerHTML = values
    .map((rawValue, index) => {
      const key = String(rawValue);
      const label =
        content.labels?.[field]?.[key] ?? key;
      const color =
        getSeriesColor(content, field, rawValue, index);

      return `
        <div class="legend-item-card" data-legend-item="${escapeAttribute(key)}">
          <div class="legend-item-topline">
            <input
              class="legend-color-input"
              type="color"
              value="${escapeAttribute(color)}"
              data-legend-color="${escapeAttribute(key)}"
            >
            <input
              class="legend-label-input"
              type="text"
              value="${escapeAttribute(label)}"
              data-legend-label="${escapeAttribute(key)}"
            >
          </div>
          <div class="legend-source-name">
            Valor original: ${escapeHtml(key)}
          </div>
        </div>
      `;
    })
    .join("");

  el.legendItemsEditor
    .querySelectorAll("[data-legend-label]")
    .forEach(input => {
      input.addEventListener("change", () => {
        updateFigureContent(current => {
          const currentField = getLegendField(current);
          if (!currentField) return;

          ensureLegendStructures(current, currentField);

          const key = input.dataset.legendLabel;
          const value = input.value.trim();

          if (value && value !== key) {
            current.labels[currentField][key] = value;
          } else {
            delete current.labels[currentField][key];
          }
        });
      });
    });

  el.legendItemsEditor
    .querySelectorAll("[data-legend-color]")
    .forEach(input => {
      input.addEventListener("change", event => {
        event.stopPropagation();

        updateFigureContent(current => {
          const currentField = getLegendField(current);
          if (!currentField) return;

          ensureLegendStructures(current, currentField);

          const key = input.dataset.legendColor;
          current.series_styles[currentField][key] ??= {};
          current.series_styles[currentField][key].color =
            input.value;
        });
      });
    });

  el.legendItemsEditor
    .querySelectorAll(".legend-item-card")
    .forEach(card => {
      card.addEventListener("click", event => {
        if (
          event.target.matches("input") ||
          event.target.closest("input")
        ) {
          return;
        }

        selectSeries(
          content,
          field,
          card.dataset.legendItem
        );
      });
    });

  if (state.selectedSeries?.field === field) {
    const exists = values.some(
      value =>
        String(value) ===
        String(state.selectedSeries.key)
    );

    if (exists) {
      selectSeries(
        content,
        field,
        state.selectedSeries.key
      );
    } else {
      clearSeriesSelection();
    }
  } else {
    clearSeriesSelection();
  }
}



function getMarksContextLabel(content) {
  switch (content?.type) {
    case "scatter":
    case "faceted_scatter":
      return "Pontos";
    case "density":
      return "Curvas";
    case "histogram":
      return "Barras";
    case "boxplot":
      return "Boxplots";
    case "stacked_bar_percent":
      return "Barras";
    case "pie":
      return "Fatias";
    default:
      return "Marcas";
  }
}

function supportsMarksContext(content) {
  return [
    "scatter",
    "faceted_scatter",
    "density",
    "histogram",
    "boxplot",
    "stacked_bar_percent",
    "pie"
  ].includes(content?.type);
}

function updatePlotLayerChooser(content, selectedPart) {
  if (!el.plotLayerChooser) return;

  const isInnerContext =
    selectedPart === "graph" ||
    selectedPart === "series";

  const canEditMarks =
    supportsMarksContext(content);

  el.plotLayerChooser.hidden =
    !isInnerContext ||
    !canEditMarks;

  if (el.plotLayerChooser.hidden) {
    return;
  }

  el.plotLayerMarks.textContent =
    getMarksContextLabel(content);

  el.plotLayerGraph.classList.toggle(
    "active",
    selectedPart === "graph"
  );

  el.plotLayerMarks.classList.toggle(
    "active",
    selectedPart === "series"
  );
}

function openMarksContext(content) {
  if (!supportsMarksContext(content)) {
    showFigureProperties(content, "graph");
    return;
  }

  const field = getLegendField(content);

  showFigureProperties(content, "series");

  const values = getLegendValues(content, field);

  /*
   * Se existe apenas uma série/marca, abrimos diretamente suas
   * propriedades. Se existem várias, mostramos o navegador de séries.
   */
  if (values.length === 1) {
    selectSeries(
      content,
      field,
      values[0]
    );

    state.selection = {
      type: "figure",
      part: "series"
    };

    setContextVisibility("series", content);
    updatePlotLayerChooser(content, "series");
    renderSeriesBrowser(content);
    return;
  }

  if (
    state.selectedSeries &&
    state.selectedSeries.field === field &&
    values.some(
      value =>
        String(value) ===
        String(state.selectedSeries.key)
    )
  ) {
    selectSeries(
      content,
      field,
      state.selectedSeries.key
    );
  }

  updatePlotLayerChooser(content, "series");
}

function setContextVisibility(selectedPart, content) {
  const isFacet = content?.type === "faceted_scatter";

  const titleFields = [
    el.figTitle.closest(".field"),
    el.figSubtitle.closest(".field"),
    el.figTitleFont.closest(".field"),
    el.figTitleSize.closest(".field"),
    el.figTitleColor.closest(".field")
  ];

  const xAxisFields = [
    el.figXTitle.closest(".field"),
    el.figXFont.closest(".field"),
    el.figXColor.closest(".field"),
    el.figXLineColor.closest(".field"),
    el.figXMin.closest(".field"),
    el.figXMax.closest(".field")
  ];

  const yAxisFields = [
    el.figYTitle.closest(".field"),
    el.figYFont.closest(".field"),
    el.figYColor.closest(".field"),
    el.figYLineColor.closest(".field"),
    el.figYMin.closest(".field"),
    el.figYMax.closest(".field")
  ];

  const legendFields = [
    el.figLegendTitle.closest(".field"),
    el.figLegendVisible.closest(".switch-row"),
    el.figLegendPosition.closest(".field"),
    el.figLegendTheme.closest(".field"),
    el.legendItemsSection,
    el.seriesBrowserSection
  ];

  const graphFields = [
    el.graphGeneralAccordion
  ];

  const facetFields = [
    el.facetOverrideControls,
    el.facetTitleField
  ];

  const seriesFields = [
    el.seriesBrowserSection,
    el.seriesEditorSection,
    el.scatterSeriesControls
  ];

  const all = [
    ...titleFields,
    ...xAxisFields,
    ...yAxisFields,
    ...legendFields,
    ...graphFields,
    ...facetFields,
    ...seriesFields
  ].filter(Boolean);

  all.forEach(node => {
    node.hidden = true;
    node.classList.add("context-hidden");
  });

  const show = nodes => {
    nodes.filter(Boolean).forEach(node => {
      node.hidden = false;
      node.classList.remove("context-hidden");
    });
  };

  if (selectedPart === "title") {
    show(titleFields);
  } else if (selectedPart === "x_axis") {
    show(xAxisFields);
  } else if (selectedPart === "y_axis") {
    show(yAxisFields);
  } else if (selectedPart === "legend") {
    show(legendFields);
  } else if (selectedPart === "facet_panel") {
    if (isFacet) {
      show([el.facetTitleField, el.facetOverrideControls]);
    }
  } else if (selectedPart === "series") {
    show(seriesFields);
  } else {
    // Área do gráfico
    show(graphFields);

    if (isFacet) {
      show([el.facetOverrideControls]);
    }
  }
}


const FIGURE_THEMES = {
  clean: {
    background: "#ffffff",
    plot_background: "#ffffff",
    grid_color: "#e7ebf0",
    text_color: "#1f2937",
    axis_line_color: "#4b5563"
  },
  soft: {
    background: "#f5f7fa",
    plot_background: "#fbfcfd",
    grid_color: "#dde3ea",
    text_color: "#334155",
    axis_line_color: "#64748b"
  },
  paper: {
    background: "#f7f2e8",
    plot_background: "#fffaf0",
    grid_color: "#ded5c6",
    text_color: "#3d352c",
    axis_line_color: "#6b6258"
  },
  dark: {
    background: "#1f2937",
    plot_background: "#111827",
    grid_color: "#374151",
    text_color: "#f3f4f6",
    axis_line_color: "#9ca3af"
  }
};

function ensureAppearance(content) {
  content.appearance ??= {};
  content.appearance.title ??= {};
  content.appearance.axes ??= {};
  content.appearance.axes.x ??= {};
  content.appearance.axes.y ??= {};
  return content.appearance;
}

function getThemeDefaults(content) {
  const name =
    content?.appearance?.theme ??
    "clean";

  return FIGURE_THEMES[name] ??
    FIGURE_THEMES.clean;
}

function applyThemePreset(content, themeName) {
  const appearance =
    ensureAppearance(content);

  const preset =
    FIGURE_THEMES[themeName] ??
    FIGURE_THEMES.clean;

  appearance.theme = themeName;
  appearance.background = preset.background;
  appearance.plot_background = preset.plot_background;
  appearance.grid_color = preset.grid_color;

  appearance.title.color =
    preset.text_color;

  appearance.axes.x.color =
    preset.text_color;
  appearance.axes.y.color =
    preset.text_color;

  appearance.axes.x.line_color =
    preset.axis_line_color;
  appearance.axes.y.line_color =
    preset.axis_line_color;
}

function showFigureProperties(content, selectedPart = "graph") {
  enforceEditorContext("figure");

  el.propertiesEmpty.hidden = true;
  el.rowProperties.hidden = true;
  el.tableTextAccordion.hidden = true;
  el.tableThemeAccordion.hidden = true;
  el.figureProperties.classList.remove("force-hidden");
  el.figureProperties.hidden = false;

  const labels = {
    graph: "Área do gráfico",
    title: "Título",
    x_axis: "Eixo X",
    y_axis: "Eixo Y",
    legend: "Legenda",
    facet: "Painéis",
    facet_panel: "Painel",
    series: "Marcas"
  };

  el.figureSelectionKind.textContent =
    labels[selectedPart] ?? "Gráfico";

  el.propertiesTitle.textContent =
    content?.title ?? "Gráfico";

  el.figTitle.value = content?.title ?? "";
  el.figSubtitle.value = content?.subtitle ?? content?.description ?? "";

  const appearance =
    ensureAppearance(content);
  const themeDefaults =
    getThemeDefaults(content);

  el.figTheme.value =
    appearance.theme ?? "clean";

  el.figGlobalFont.value =
    appearance.font ?? "system-ui";

  el.figBackgroundColor.value =
    appearance.background ??
    themeDefaults.background;

  el.figPlotBackgroundColor.value =
    appearance.plot_background ??
    themeDefaults.plot_background;

  el.figGridColor.value =
    appearance.grid_color ??
    themeDefaults.grid_color;

  el.figTitleFont.value =
    appearance.title?.font ??
    appearance.font ??
    "system-ui";

  el.figTitleSize.value =
    appearance.title?.size ?? 18;

  el.figTitleColor.value =
    appearance.title?.color ??
    themeDefaults.text_color;
  el.figXTitle.value = content?.axes?.x?.title ?? "";
  el.figYTitle.value = content?.axes?.y?.title ?? "";

  el.figXFont.value =
    appearance.axes?.x?.font ??
    appearance.font ??
    "system-ui";
  el.figYFont.value =
    appearance.axes?.y?.font ??
    appearance.font ??
    "system-ui";

  el.figXColor.value =
    appearance.axes?.x?.color ??
    themeDefaults.text_color;
  el.figYColor.value =
    appearance.axes?.y?.color ??
    themeDefaults.text_color;

  el.figXLineColor.value =
    appearance.axes?.x?.line_color ??
    themeDefaults.axis_line_color;
  el.figYLineColor.value =
    appearance.axes?.y?.line_color ??
    themeDefaults.axis_line_color;
  el.figHeight.value = content?.parameters?.height ?? 420;
  el.figPointSize.value = content?.parameters?.size ?? 75;
  el.figOpacity.value =
    content?.parameters?.opacity ??
    content?.parameters?.alpha ??
    0.85;
  el.figLegendVisible.checked =
    content?.parameters?.show_legend !== false;
  el.figLegendTitle.value = content?.legend?.title ?? "";
  el.figLegendPosition.value =
    content?.legend?.position ?? "right";
  el.figLegendTheme.value =
    content?.legend?.theme ?? "none";

  renderLegendItemsEditor(content);
  renderSeriesBrowser(content);
  renderFacetOverrideControls(content);

  el.figXMin.value = content?.axes?.x?.min ?? "";
  el.figXMax.value = content?.axes?.x?.max ?? "";
  el.figYMin.value = content?.axes?.y?.min ?? "";
  el.figYMax.value = content?.axes?.y?.max ?? "";

  const yIsPercent =
    content?.type === "stacked_bar_percent" ||
    content?.axes?.y?.format === "percent";

  const yMinLabel = el.figYMin.closest(".field")?.querySelector("label");
  const yMaxLabel = el.figYMax.closest(".field")?.querySelector("label");

  if (yMinLabel) {
    yMinLabel.textContent = yIsPercent
      ? "Mínimo do eixo Y (%)"
      : "Mínimo do eixo Y";
  }

  if (yMaxLabel) {
    yMaxLabel.textContent = yIsPercent
      ? "Máximo do eixo Y (%)"
      : "Máximo do eixo Y";
  }

  if (yIsPercent) {
    el.figYMin.min = "0";
    el.figYMin.max = "100";
    el.figYMax.min = "0";
    el.figYMax.max = "100";
    el.figYMin.placeholder = "0";
    el.figYMax.placeholder = "100";
  } else {
    el.figYMin.removeAttribute("min");
    el.figYMin.removeAttribute("max");
    el.figYMax.removeAttribute("min");
    el.figYMax.removeAttribute("max");
    el.figYMin.placeholder = "";
    el.figYMax.placeholder = "";
  }

  const isFacet = content?.type === "faceted_scatter";
  el.facetControls.hidden = !isFacet;

  el.figFacetColumns.value =
    content?.parameters?.facet_columns ?? 3;
  el.figFacetWidth.value =
    content?.parameters?.facet_width ?? 280;
  el.figFacetHeight.value =
    content?.parameters?.facet_height ?? 300;

  // Mostra apenas os controles mais relevantes para o elemento clicado.
  setContextVisibility(selectedPart, content);
  updatePlotLayerChooser(content, selectedPart);

  state.selection = {
    type: "figure",
    part: selectedPart
  };

  if (
    selectedPart !== "legend" &&
    selectedPart !== "series"
  ) {
    clearSeriesSelection();
  }

  document
    .querySelectorAll(".figure-hitbox")
    .forEach(node => {
      node.classList.toggle(
        "active",
        node.dataset.figurePart === selectedPart
      );
    });
}



function openPointSeriesContext(content) {
  const type = content?.type;

  if (
    type !== "scatter" &&
    type !== "faceted_scatter"
  ) {
    showFigureProperties(content, "graph");
    return;
  }

  const field = getLegendField(content);

  showFigureProperties(content, "series");

  const values = getLegendValues(content, field);

  /*
   * Scatter simples: getLegendField() devolve "__all__"
   * e getLegendValues() devolve ["Pontos"].
   * Nesse caso já abrimos diretamente o editor da série.
   */
  if (
    field === "__all__" &&
    values.length === 1
  ) {
    selectSeries(
      content,
      field,
      values[0]
    );

    state.selection = {
      type: "figure",
      part: "series"
    };

    setContextVisibility(
      "series",
      content
    );

    renderSeriesBrowser(content);
    return;
  }

  /*
   * Scatter agrupado: mostramos a lista de séries e mantemos
   * a série já selecionada, se existir.
   */
  if (
    state.selectedSeries &&
    state.selectedSeries.field === field
  ) {
    const stillExists = values.some(
      value =>
        String(value) ===
        String(state.selectedSeries.key)
    );

    if (stillExists) {
      selectSeries(
        content,
        field,
        state.selectedSeries.key
      );
    }
  }
}

function selectFacetPanel(content, facetKey) {
  state.selectedFacetKey =
    String(facetKey);

  state.selection = {
    type: "figure",
    part: "facet_panel",
    facetKey: String(facetKey)
  };

  const field = getFacetField(content);
  const key = String(facetKey);

  content.facet_labels ??= {};
  content.facet_labels[field] ??= {};

  const label =
    content.facet_labels[field][key] ??
    key;

  el.facetTitleValue.value = label;

  el.figureSelectionKind.textContent =
    `Painel: ${label}`;

  el.propertiesTitle.textContent =
    content?.title ?? "Gráfico";

  setContextVisibility("facet_panel", content);
  renderFacetOverrideControls(content);

  document
    .querySelectorAll(".facet-hitbox")
    .forEach(node => {
      node.classList.toggle(
        "active",
        node.dataset.facetKey === key
      );
    });
}

function updateFigureContent(mutator) {
  const content = getWorkingContent();
  if (!content) return;

  mutator(content);
  renderArtifact(state.workingArtifact);
}

function ensureFigurePath(content) {
  content.axes ??= {};
  content.axes.x ??= {};
  content.axes.y ??= {};
  content.parameters ??= {};
  content.legend ??= {};
  return content;
}

function resetFigureEdits() {
  if (!state.currentArtifact) return;

  pushUndoSnapshot();

  state.workingArtifact = deepClone(state.currentArtifact);
  const content = getWorkingContent();
  showFigureProperties(content, "graph");
  renderArtifact(state.workingArtifact);
}

async function renderFigure(raw) {
  const { storage, content } = unwrapArtifact(raw);

  const title =
    content?.title ??
    storage?.artifact?.title ??
    getSelectedArtifact()?.title ??
    "Gráfico";

  const subtitle =
    content?.subtitle ??
    content?.description ??
    "";

  el.artifactView.classList.remove("empty-state");
  el.artifactViewTitle.textContent = title;

  if (!window.StatFigureAdapters) {
    el.artifactView.innerHTML = `
      <div class="figure-error">
        O módulo figure-adapters.js não foi carregado.
      </div>
    `;
    return;
  }

  if (typeof window.vegaEmbed !== "function") {
    el.artifactView.innerHTML = `
      <div class="figure-error">
        Vega/Vega-Lite não foram carregados.
        Verifique a conexão com a internet.
      </div>
    `;
    return;
  }

  try {
    const spec =
      window.StatFigureAdapters.toVegaLite(content);

    el.artifactView.innerHTML = `
      <div
        class="figure-shell"
        style="
          background:${escapeAttribute(content?.appearance?.background ?? "#ffffff")};
          padding:12px;
          border-radius:10px;
        "
      >
        <div
          class="figure-title figure-edit-target"
          data-figure-part="title"
          style="
            color:${escapeAttribute(content?.appearance?.title?.color ?? "#1f2937")};
            font-family:${escapeAttribute(content?.appearance?.title?.font ?? content?.appearance?.font ?? "system-ui")};
            font-size:${escapeAttribute(String(content?.appearance?.title?.size ?? 18))}px;
          "
        >${escapeHtml(title)}</div>
        ${subtitle
          ? `<div class="figure-subtitle figure-edit-target" data-figure-part="title">${escapeHtml(subtitle)}</div>`
          : ""}
        <div id="vega-chart" class="figure-canvas"></div>
        <div class="figure-meta">
          Adapter: ${escapeHtml(content?.type ?? "—")} → Vega-Lite
        </div>
      </div>
    `;

    await window.vegaEmbed(
      "#vega-chart",
      spec,
      {
        actions: false,
        renderer: "svg"
      }
    );

    const chartContainer =
      el.artifactView.querySelector(".figure-shell");

    if (chartContainer) {
      chartContainer.classList.add("figure-interaction-wrap");

      if (content?.type === "faceted_scatter") {
        chartContainer.classList.add("is-faceted");
      }

      const hitboxes = [
        ["title", "figure-hitbox-title", "Selecionar título"],
        ["x_axis", "figure-hitbox-xaxis", "Selecionar eixo X"],
        ["y_axis", "figure-hitbox-yaxis", "Selecionar eixo Y"],
        ["legend", "figure-hitbox-legend", "Selecionar legenda"],
        ["graph", "figure-hitbox-plot", "Selecionar área do gráfico"]
      ];

      hitboxes.forEach(([part, className, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `figure-hitbox ${className}`;
        button.dataset.figurePart = part;
        button.setAttribute("aria-label", label);
        button.title = label;

        button.addEventListener("click", event => {
          event.stopPropagation();

          if (part === "graph") {
            showFigureProperties(content, "graph");
          } else {
            showFigureProperties(content, part);
          }
        });

        chartContainer.appendChild(button);
      });

      if (content?.type === "faceted_scatter") {
        const field = getFacetField(content);
        const values = getFacetValues(content, field);

        requestAnimationFrame(() => {
          const svg = chartContainer.querySelector("svg");

          if (!svg || !values.length) return;

          const svgRect = svg.getBoundingClientRect();
          const wrapRect = chartContainer.getBoundingClientRect();

          /*
           * Distribuímos hitboxes finos por painel de acordo com
           * facet_columns. Eles ficam apenas no título e nos eixos,
           * não cobrem a área interna dos pontos.
           */
          const columns =
            Math.max(
              1,
              Math.min(
                Number(content?.parameters?.facet_columns) || values.length,
                values.length
              )
            );

          const rows =
            Math.ceil(values.length / columns);

          const panelWidth =
            svgRect.width / columns;

          const panelHeight =
            svgRect.height / rows;

          values.forEach((value, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);

            const baseLeft =
              svgRect.left - wrapRect.left +
              col * panelWidth;

            const baseTop =
              svgRect.top - wrapRect.top +
              row * panelHeight;

            const key = String(value);

            const makeFacetHitbox = (
              className,
              part,
              left,
              top,
              width,
              height,
              title
            ) => {
              const button = document.createElement("button");
              button.type = "button";
              button.className =
                `facet-hitbox ${className}`;
              button.dataset.figurePart = part;
              button.dataset.facetKey = key;
              button.title = title;
              button.style.left = `${left}px`;
              button.style.top = `${top}px`;
              button.style.width = `${Math.max(18, width)}px`;
              button.style.height = `${Math.max(18, height)}px`;

              button.addEventListener("click", event => {
                event.stopPropagation();

                if (part === "facet_panel") {
                  selectFacetPanel(content, key);
                } else {
                  showFigureProperties(content, part);
                  state.selection.facetKey = key;
                }
              });

              chartContainer.appendChild(button);
            };

            // Título do painel: faixa pequena central no topo.
            makeFacetHitbox(
              "facet-title-hitbox",
              "facet_panel",
              baseLeft + panelWidth * 0.25,
              baseTop + 2,
              panelWidth * 0.5,
              28,
              `Editar painel ${key}`
            );

            // Eixo X: faixa fina embaixo do painel.
            makeFacetHitbox(
              "facet-xaxis-hitbox",
              "x_axis",
              baseLeft + 56,
              baseTop + panelHeight - 46,
              Math.max(40, panelWidth - 72),
              40,
              `Editar eixo X do painel ${key}`
            );

            // Eixo Y: faixa fina à esquerda.
            makeFacetHitbox(
              "facet-yaxis-hitbox",
              "y_axis",
              baseLeft + 2,
              baseTop + 34,
              52,
              Math.max(40, panelHeight - 82),
              `Editar eixo Y do painel ${key}`
            );
          });
        });
      }
    }

    const restorePart =
      state.selection?.part ?? "graph";

    if (
      restorePart === "series" &&
      supportsMarksContext(content)
    ) {
      openMarksContext(content);
    } else {
      showFigureProperties(
        content,
        restorePart
      );
    }

    el.artifactView
      .querySelectorAll("[data-figure-part]")
      .forEach(node => {
        node.addEventListener("click", event => {
          const part = node.dataset.figurePart;

          if (part === "graph") {
            return;
          }

          event.stopPropagation();

          showFigureProperties(
            content,
            part
          );
        });
      });

    requestAnimationFrame(() => {
      if (state.previewZoomMode === "fit") {
        fitPreviewToWidth();
      } else {
        applyPreviewZoom(
          state.previewZoom ?? 1,
          "manual"
        );
      }
    });

    const chartNode = el.artifactView.querySelector("#vega-chart");
    if (chartNode) {
      chartNode.classList.add("figure-edit-target");
      chartNode.addEventListener("click", event => {
        /*
         * Não sobrescreve cliques tratados por hitboxes.
         */
        if (event.defaultPrevented) return;

        showFigureProperties(content, "graph");
      });
    }
  } catch (error) {
    console.error(error);

    el.artifactView.innerHTML = `
      <div class="figure-error">
        <strong>Não foi possível renderizar este gráfico.</strong><br>
        ${escapeHtml(error.message)}
      </div>
    `;
  }
}

function renderArtifact(raw) {
  const normalized = unwrapArtifact(raw);
  const contentType = normalized.content?.type;

  if (
    el.kind.value === "table" ||
    contentType === "table"
  ) {
    renderTable(raw);
    updateExportButtons();
    return;
  }

  renderFigure(raw);
  updateExportButtons();
}

function updateSummary(raw, url) {
  const project = getSelectedProject();
  const artifact = getSelectedArtifact();
  const version = Number(el.version.value);
  const normalized = unwrapArtifact(raw);

  el.summaryProject.textContent =
    project
      ? `[${project.project_id}] ${project.project_name}`
      : "—";

  el.summaryArtifact.textContent =
    artifact
      ? `${artifact.id}${artifact.title ? ` — ${artifact.title}` : ""}`
      : "—";

  el.summaryType.textContent =
    normalized.content?.type ??
    normalized.storage?.artifact?.kind ??
    el.kind.value;

  el.summaryVersion.textContent =
    `v${String(version).padStart(3, "0")}`;

  el.artifactUrl.textContent = url;
  el.preview.textContent = JSON.stringify(
    raw,
    null,
    2
  );
}

async function loadArtifact() {
  try {
    setStatus(
      "loading",
      "Carregando artefato..."
    );

    const url = buildArtifactUrl();
    const raw = await fetchJson(
      `${url}?t=${Date.now()}`
    );

    state.currentArtifact = raw;
    state.workingArtifact = deepClone(raw);
    resetUndoHistory();
    state.selection = null;
    clearSelection();

    updateSummary(raw, url);
    renderArtifact(state.workingArtifact);

    setStatus(
      "ok",
      "Artefato carregado e renderizado."
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      error.message
    );

    el.artifactView.classList.add("empty-state");
    el.artifactView.innerHTML =
      `Erro ao carregar o artefato:<br><strong>${escapeHtml(error.message)}</strong>`;

    el.preview.textContent =
      `Erro:\n${error.message}`;
  }
}

async function loadIndex() {
  try {
    setStatus(
      "loading",
      "Carregando projetos..."
    );

    state.index = await fetchJson(
      `${INDEX_URL}?t=${Date.now()}`
    );

    fillProjects();

    setStatus(
      "ok",
      `${getProjects().length} projeto(s) encontrado(s).`
    );
  } catch (error) {
    console.error(error);

    setStatus(
      "error",
      `Falha ao carregar projetos: ${error.message}`
    );
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/*
 * ===== Histórico / Desfazer =====
 */
el.undoEdit?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    undoLastEdit();
  }
);


el.saveChanges?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    saveCurrentChanges();
  }
);

el.saveTheme?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    saveCurrentTheme();
  }
);

el.loadChanges?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    el.loadChangesFile.value = "";
    el.loadChangesFile.click();
  }
);

el.loadTheme?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    el.loadThemeFile.value = "";
    el.loadThemeFile.click();
  }
);


el.exportPng?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    if (isCurrentArtifactTable()) {
      exportTablePng();
    } else {
      exportFigurePng();
    }
  }
);

el.exportSvg?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    if (isCurrentArtifactTable()) {
      exportTableSvg();
    } else {
      exportFigureSvg();
    }
  }
);


el.openTableHtml?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    openTableHtml();
  }
);

el.exportTableHtml?.addEventListener(
  "click",
  event => {
    event.preventDefault();
    exportTableHtml();
  }
);

el.loadChangesFile?.addEventListener(
  "change",
  async () => {
    const file =
      el.loadChangesFile.files?.[0];

    if (!file) return;

    try {
      await loadSavedChangesFile(file);
    } catch (error) {
      console.error(error);
      setStatus("error", error.message);
    }
  }
);

el.loadThemeFile?.addEventListener(
  "change",
  async () => {
    const file =
      el.loadThemeFile.files?.[0];

    if (!file) return;

    try {
      const theme =
        await readJsonFile(file);

      applyThemeToCurrentArtifact(
        theme
      );
    } catch (error) {
      console.error(error);
      setStatus("error", error.message);
    }
  }
);

document.addEventListener(
  "keydown",
  event => {
    const isUndo =
      (event.ctrlKey || event.metaKey) &&
      !event.shiftKey &&
      event.key.toLowerCase() === "z";

    if (!isUndo) {
      return;
    }

    /*
     * Se o usuário estiver digitando dentro de um campo,
     * primeiro deixamos o navegador cuidar do undo do texto.
     */
    const active =
      document.activeElement;

    const tag =
      active?.tagName
        ?.toLowerCase();

    if (
      tag === "textarea" ||
      (
        tag === "input" &&
        ![
          "checkbox",
          "radio",
          "color",
          "range",
          "button"
        ].includes(active.type)
      ) ||
      active?.isContentEditable
    ) {
      return;
    }

    if (!state.undoStack.length) {
      return;
    }

    event.preventDefault();
    undoLastEdit();
  }
);

el.project.addEventListener(
  "change",
  fillArtifacts
);

el.kind.addEventListener(
  "change",
  fillArtifacts
);

el.artifact.addEventListener(
  "change",
  fillVersions
);

el.load.addEventListener(
  "click",
  loadArtifact
);

el.reload.addEventListener(
  "click",
  loadIndex
);



/* ===== V41: controles de edição restaurados da V39 ===== */
el.propColumnName.addEventListener("change", () => {
  pushUndoSnapshot();
  if (state.selection?.type !== "column") {
    return;
  }

  const selection = {
    ...state.selection
  };

  const column =
    getEditableColumn(
      selection.columnId
    );

  if (!column) return;

  /*
   * Canonical V2 usa `name`.
   * O id/key da coluna não muda, apenas o texto exibido.
   */
  column.name =
    el.propColumnName.value;

  if ("label" in column) {
    delete column.label;
  }

  if ("title" in column) {
    delete column.title;
  }

  selectTarget(selection);
});

el.propCellValue.addEventListener("change", () => {
  pushUndoSnapshot();
  if (state.selection?.type !== "cell") {
    return;
  }

  const selection = {
    ...state.selection
  };

  const row =
    findRowById(
      getContentRows(),
      selection.rowId
    );

  if (!row) return;

  const cell =
    getEditableCell(
      row,
      selection.columnId
    );

  if (!cell) {
    return;
  }

  /*
   * Ao editar, normalizamos a célula para o formato:
   * { value: ..., style: ... }
   * preservando qualquer style que já exista.
   */
  cell.value =
    el.propCellValue.value;

  if ("text" in cell) {
    delete cell.text;
  }

  if ("display" in cell) {
    delete cell.display;
  }

  selectTarget(selection);
});

el.tableTitle.addEventListener("change", () => {
  pushUndoSnapshot();
  if (state.selection?.type !== "table") return;
  state.workingArtifact.artifact ??= {};
  state.workingArtifact.artifact.title = el.tableTitle.value;
  const content = getWorkingContent();
  if (content && "title" in content) delete content.title;
  selectTarget({ type: "table" });
});

el.tableSubtitle.addEventListener("change", () => {
  pushUndoSnapshot();
  if (state.selection?.type !== "table") return;
  const content = getWorkingContent();
  if (!content) return;
  if (el.tableSubtitle.value) content.subtitle = el.tableSubtitle.value;
  else delete content.subtitle;
  selectTarget({ type: "table" });
});

el.tableNotes.addEventListener("change", () => {
  pushUndoSnapshot();
  if (state.selection?.type !== "table") return;
  const content = getWorkingContent();
  if (!content) return;
  let value = el.tableNotes.value.replace(/^\s*(?:\*\*)?Nota\.?(?:\*\*)?\s*/i, "");
  if (value) content.notes = value;
  else delete content.notes;
  delete content.footnotes;
  delete content.table_notes;
  selectTarget({ type: "table" });
});

el.tableTheme.addEventListener("change", () => {
  pushUndoSnapshot();
  const content =
    getWorkingContent();

  if (
    !content ||
    state.selection?.type !== "table"
  ) {
    return;
  }

  applyTableThemePreset(
    content,
    el.tableTheme.value
  );

  selectTarget({ type: "table" });
});

el.tableDensity.addEventListener("change", () => {
  pushUndoSnapshot();
  const content =
    getWorkingContent();

  if (
    !content ||
    state.selection?.type !== "table"
  ) {
    return;
  }

  ensureTableAppearance(content).density =
    el.tableDensity.value;

  selectTarget({ type: "table" });
});


el.tableDecimalSeparator.addEventListener("change", () => {
  pushUndoSnapshot();
  const content =
    getWorkingContent();

  if (
    !content ||
    state.selection?.type !== "table"
  ) {
    return;
  }

  ensureTableAppearance(content).decimal_separator =
    el.tableDecimalSeparator.value;

  selectTarget({ type: "table" });
});

el.tableGlobalFont.addEventListener("change", () => {
  pushUndoSnapshot();
  const content =
    getWorkingContent();

  if (
    !content ||
    state.selection?.type !== "table"
  ) {
    return;
  }

  ensureTableAppearance(content).font =
    el.tableGlobalFont.value;

  selectTarget({ type: "table" });
});

el.tableHeaderBackground.addEventListener("change", () => {
  pushUndoSnapshot();
  const content =
    getWorkingContent();

  if (
    !content ||
    state.selection?.type !== "table"
  ) {
    return;
  }

  ensureTableAppearance(content).header_background =
    el.tableHeaderBackground.value;

  selectTarget({ type: "table" });
});

el.tableBorderColor.addEventListener("change", () => {
  pushUndoSnapshot();
  const content =
    getWorkingContent();

  if (
    !content ||
    state.selection?.type !== "table"
  ) {
    return;
  }

  ensureTableAppearance(content).border_color =
    el.tableBorderColor.value;

  selectTarget({ type: "table" });
});

el.propBold.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).bold =
      el.propBold.checked;
  });
});

el.propItalic.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).italic =
      el.propItalic.checked;
  });
});

el.propFont.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    const style = ensureStyle(target);
    if (el.propFont.value) style.font = el.propFont.value;
    else delete style.font;
  });
});

el.propFontSize.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    const style = ensureStyle(target);
    const value = Number(el.propFontSize.value);
    if (Number.isFinite(value) && value > 0) style.font_size = value;
    else delete style.font_size;
  });
});

el.propBorderTop.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).border_top =
      el.propBorderTop.checked;
  });
});

el.propBorderBottom.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).border_bottom =
      el.propBorderBottom.checked;
  });
});

el.propBorderLeft.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).border_left =
      el.propBorderLeft.checked;
  });
});

el.propBorderRight.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).border_right =
      el.propBorderRight.checked;
  });
});

el.propAlign.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    const style = ensureStyle(target);

    if (el.propAlign.value) {
      style.align = el.propAlign.value;
    } else {
      delete style.align;
    }
  });
});

el.propBackground.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).background = el.propBackground.value;
  });
});

el.propBackgroundReset.addEventListener("click", () => {
  pushUndoSnapshot();
  const selection =
    state.selection
      ? { ...state.selection }
      : null;

  updateSelection(target => {
    delete ensureStyle(target).background;
  });

  if (selection) {
    requestAnimationFrame(
      () => selectTarget(selection)
    );
  }
});

el.propColor.addEventListener("change", () => {
  pushUndoSnapshot();
  updateSelection(target => {
    ensureStyle(target).color = el.propColor.value;
  });
});

el.propColorReset.addEventListener("click", () => {
  pushUndoSnapshot();
  const selection =
    state.selection
      ? { ...state.selection }
      : null;

  updateSelection(target => {
    delete ensureStyle(target).color;
  });

  if (selection) {
    requestAnimationFrame(
      () => selectTarget(selection)
    );
  }
});

el.propHidden.addEventListener("change", () => {
  pushUndoSnapshot();
  if (
    !state.selection ||
    state.selection.type === "cell" ||
    state.selection.type === "table"
  ) {
    return;
  }

  updateSelection(target => {
    target.visible =
      !el.propHidden.checked;
  });

  if (el.propHidden.checked) {
    clearSelection();
  }
});


el.deleteRow.addEventListener("click", () => {
  pushUndoSnapshot();
  if (state.selection?.type !== "row") {
    return;
  }

  const content =
    getWorkingContent();

  if (!content) return;

  const rowId =
    state.selection.rowId;

  const removed =
    removeRowById(
      content.rows ??
      content.data ??
      [],
      rowId
    );

  if (!removed) {
    return;
  }

  clearSelection();
});

el.deleteColumn.addEventListener("click", () => {
  pushUndoSnapshot();
  if (state.selection?.type !== "column") {
    return;
  }

  const content =
    getWorkingContent();

  if (!content) return;

  const columnId =
    state.selection.columnId;

  const removed =
    removeColumnById(
      content,
      columnId
    );

  if (!removed) {
    return;
  }

  clearSelection();
});

el.resetRowStyle.addEventListener(
  "click",
  resetSelectedStyle
);


function bindFigureText(input, updater) {
  input.addEventListener("change", () => {
    updateFigureContent(content => {
      ensureFigurePath(content);
      updater(content, input.value);
    });
  });
}


el.figTheme.addEventListener("change", () => {
  updateFigureContent(content => {
    applyThemePreset(
      content,
      el.figTheme.value
    );
  });
});

el.figGlobalFont.addEventListener("change", () => {
  updateFigureContent(content => {
    const appearance =
      ensureAppearance(content);

    appearance.font =
      el.figGlobalFont.value;
  });
});

el.figBackgroundColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).background =
      el.figBackgroundColor.value;
  });
});

el.figPlotBackgroundColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).plot_background =
      el.figPlotBackgroundColor.value;
  });
});

el.figGridColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).grid_color =
      el.figGridColor.value;
  });
});

el.figTitleFont.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).title.font =
      el.figTitleFont.value;
  });
});

el.figTitleSize.addEventListener("change", () => {
  updateFigureContent(content => {
    const value =
      Number(el.figTitleSize.value);

    if (Number.isFinite(value)) {
      ensureAppearance(content).title.size =
        value;
    }
  });
});

el.figTitleColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).title.color =
      el.figTitleColor.value;
  });
});

el.figXFont.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).axes.x.font =
      el.figXFont.value;
  });
});

el.figYFont.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).axes.y.font =
      el.figYFont.value;
  });
});

el.figXColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).axes.x.color =
      el.figXColor.value;
  });
});

el.figYColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).axes.y.color =
      el.figYColor.value;
  });
});

el.figXLineColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).axes.x.line_color =
      el.figXLineColor.value;
  });
});

el.figYLineColor.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureAppearance(content).axes.y.line_color =
      el.figYLineColor.value;
  });
});

bindFigureText(el.figTitle, (content, value) => {
  content.title = value;
});

bindFigureText(el.figSubtitle, (content, value) => {
  content.subtitle = value;
});

bindFigureText(el.figXTitle, (content, value) => {
  content.axes.x.title = value;
});

bindFigureText(el.figYTitle, (content, value) => {
  content.axes.y.title = value;
});

el.figHeight.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.parameters.height =
      Number(el.figHeight.value) || 420;
  });
});

el.figPointSize.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.parameters.size =
      Number(el.figPointSize.value) || 75;
  });
});

el.figOpacity.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    const value = Number(el.figOpacity.value);
    content.parameters.opacity =
      Number.isFinite(value) ? value : 0.85;
    content.parameters.alpha =
      Number.isFinite(value) ? value : 0.85;
  });
});

el.figLegendVisible.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.parameters.show_legend =
      el.figLegendVisible.checked;
  });
});





el.plotLayerGraph?.addEventListener("click", () => {
  const content = state.workingArtifact?.content;
  if (!content) return;

  showFigureProperties(content, "graph");
});

el.plotLayerMarks?.addEventListener("click", () => {
  const content = state.workingArtifact?.content;
  if (!content) return;

  openMarksContext(content);
});

el.seriesPointSize.addEventListener("change", () => {
  updateFigureContent(content => {
    const style = getSelectedSeriesStyle(content);
    if (!style) return;

    const value = Number(el.seriesPointSize.value);

    if (Number.isFinite(value) && value > 0) {
      style.point_size = value;
    }
  });
});

el.seriesPointShape.addEventListener("change", () => {
  updateFigureContent(content => {
    const style = getSelectedSeriesStyle(content);
    if (!style) return;

    style.point_shape =
      el.seriesPointShape.value;
  });
});


el.facetTitleValue.addEventListener("change", () => {
  updateFigureContent(content => {
    if (content?.type !== "faceted_scatter") return;

    const field = getFacetField(content);
    const key = state.selection?.facetKey ?? state.selectedFacetKey;

    if (!field || !key) return;

    content.facet_labels ??= {};
    content.facet_labels[field] ??= {};

    const value = el.facetTitleValue.value.trim();

    if (value && value !== key) {
      content.facet_labels[field][key] = value;
    } else {
      delete content.facet_labels[field][key];
    }
  });
});

el.facetPanelColor.addEventListener("change", () => {
  updateFigureContent(content => {
    if (content?.type !== "faceted_scatter") return;

    const field = getFacetField(content);
    if (!field) return;

    ensureFacetStyles(content, field);

    const key = String(state.selectedFacetKey ?? "");

    content.facet_styles[field][key] ??= {};
    content.facet_styles[field][key].color =
      el.facetPanelColor.value;
  });
});

el.facetPanelClear.addEventListener("click", () => {
  updateFigureContent(content => {
    if (content?.type !== "faceted_scatter") return;

    const field = getFacetField(content);
    if (!field) return;

    ensureFacetStyles(content, field);

    const key = String(state.selectedFacetKey ?? "");

    if (content.facet_styles[field][key]) {
      delete content.facet_styles[field][key].color;
    }
  });
});

el.seriesName.addEventListener("change", () => {
  updateFigureContent(content => {
    const selected = state.selectedSeries;
    if (!selected) return;

    ensureLegendStructures(content, selected.field);

    const value = el.seriesName.value.trim();

    if (value && value !== selected.key) {
      content.labels[selected.field][selected.key] =
        value;
    } else {
      delete content.labels[selected.field][selected.key];
    }
  });
});

el.seriesColor.addEventListener("change", () => {
  updateFigureContent(content => {
    const style = getSelectedSeriesStyle(content);
    if (!style) return;

    style.color = el.seriesColor.value;
  });
});

el.seriesOpacity.addEventListener("change", () => {
  updateFigureContent(content => {
    const style = getSelectedSeriesStyle(content);
    if (!style) return;

    const value = Number(el.seriesOpacity.value);

    if (Number.isFinite(value)) {
      style.opacity = Math.min(1, Math.max(0, value));
    }
  });
});

el.seriesLineWidth.addEventListener("change", () => {
  updateFigureContent(content => {
    const style = getSelectedSeriesStyle(content);
    if (!style) return;

    const value = Number(el.seriesLineWidth.value);

    if (Number.isFinite(value) && value >= 0) {
      style.line_width = value;
    }
  });
});

el.seriesFillVisible.addEventListener("change", () => {
  updateFigureContent(content => {
    const style = getSelectedSeriesStyle(content);
    if (!style) return;

    style.fill_visible =
      el.seriesFillVisible.checked;
  });
});

el.figLegendPosition.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.legend.position =
      el.figLegendPosition.value;
  });
});

el.figLegendTheme.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.legend.theme =
      el.figLegendTheme.value;
  });
});

bindFigureText(el.figLegendTitle, (content, value) => {
  content.legend.title = value;
});

el.figFacetColumns.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.parameters.facet_columns =
      Number(el.figFacetColumns.value) || 3;
  });
});

el.figFacetWidth.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.parameters.facet_width =
      Number(el.figFacetWidth.value) || 280;
  });
});

el.figFacetHeight.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    content.parameters.facet_height =
      Number(el.figFacetHeight.value) || 300;
  });
});


function setOptionalNumber(target, key, rawValue) {
  const text = String(rawValue ?? "").trim();

  if (!text) {
    delete target[key];
    return;
  }

  const number = Number(text);

  if (Number.isFinite(number)) {
    target[key] = number;
  }
}

function normalizeAxisBounds(axis) {
  if (!axis) return;

  if (
    axis.min !== undefined &&
    axis.max !== undefined &&
    Number(axis.min) >= Number(axis.max)
  ) {
    delete axis.max;
  }
}

el.figXMin.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    setOptionalNumber(content.axes.x, "min", el.figXMin.value);
    normalizeAxisBounds(content.axes.x);
  });
});

el.figXMax.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    setOptionalNumber(content.axes.x, "max", el.figXMax.value);
    normalizeAxisBounds(content.axes.x);
  });
});

el.figYMin.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    setOptionalNumber(content.axes.y, "min", el.figYMin.value);
    normalizeAxisBounds(content.axes.y);
  });
});

el.figYMax.addEventListener("change", () => {
  updateFigureContent(content => {
    ensureFigurePath(content);
    setOptionalNumber(content.axes.y, "max", el.figYMax.value);
    normalizeAxisBounds(content.axes.y);
  });
});

el.resetFigureStyle.addEventListener(
  "click",
  resetFigureEdits
);


el.zoomOut?.addEventListener(
  "click",
  () => stepPreviewZoom(-1)
);

el.zoomIn?.addEventListener(
  "click",
  () => stepPreviewZoom(1)
);

el.zoomLevel?.addEventListener(
  "change",
  () => {
    applyPreviewZoom(
      Number(el.zoomLevel.value),
      "manual"
    );
  }
);

el.zoomFit?.addEventListener(
  "click",
  fitPreviewToWidth
);

el.zoomReset?.addEventListener(
  "click",
  resetPreviewZoom
);

window.addEventListener(
  "resize",
  () => {
    if (
      state.previewZoomMode === "fit"
    ) {
      fitPreviewToWidth();
    }
  }
);


loadIndex();
